import React, { Component } from "react";
import Cook from "../../img/cook.svg";
import { Link } from "react-router-dom";

class RecipeItem extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="recipe">
        <div className="recipe__img">
          <img
            src={`../${recipe.recipeImage}`}
            alt="recipe"
            className="recipe__img__img"
          />
        </div>
        <Link to={`/recipes/${recipe._id}`} className="recipe__title">
          {recipe.title}
        </Link>
        <div className="recipe__line">&nbsp;</div>
        <div className="recipe__details">
          <div className="recipe__time">
            <img src={Cook} alt="icon" className="recipe__time__icon" />
            <p>{recipe.time} min</p>
          </div>
          <Link className="recipe__author" to={`/profile/${recipe.handle}`}>
            <p>{recipe.name}</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default RecipeItem;
