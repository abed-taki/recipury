import React, { Component } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../../actions/recipeActions";
import Spinner from "../common/Spinner";
import RecipeItem from "./RecipeItem";

class RecipeFeed extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    const { recipes, loading } = this.props.recipe;
    let Content;
    if (recipes === null || loading) {
      Content = <Spinner />;
    } else {
      Content = recipes.map(recipe => (
        <RecipeItem key={recipe._id} recipe={recipe} />
      ));
    }
    return (
      <div>
        <div style={{ marginBottom: "8rem" }} className="container" />
        <div className="container recipes">{Content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(RecipeFeed);
