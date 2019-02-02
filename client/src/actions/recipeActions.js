import axios from "axios";
import { GET_ERRORS, RECIPE_LOADING, GET_RECIPES, GET_RECIPE } from "./types";

// recipe loading
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};

// add recipe
export const addRecipe = (recipeData, history) => dispatch => {
  axios
    .post("/api/recipes", recipeData)
    .then(res => history.push("/recipes"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete recipe
export const deleteRecipe = (id, history) => dispatch => {
  if (window.confirm("Are you sure you want to delete this recipe?")) {
    axios
      .delete(`/api/recipes/${id}`)
      .then(res => history.push("/recipes"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// get all recipes
export const getRecipes = () => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get("/api/recipes")
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

// get recipe by id
export const getRecipeById = id => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipes/${id}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

// like arecipe
export const likeRecipe = id => dispatch => {
  axios
    .post(`/api/recipes/like/${id}`)
    .then(res => dispatch(getRecipeById(id)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add comment
export const addComment = (id, formData) => dispatch => {
  axios
    .post(`/api/recipes/comment/${id}`, formData)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
