import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRecipeById,
  likeRecipe,
  deleteRecipe
} from "../../actions/recipeActions";
import { withRouter } from "react-router-dom";
import Comment from "./Comment";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Spinner from "../common/Spinner";
import Heart from "../../img/heart.svg";
import HeartRed from "../../img/heart-red.svg";

class Recipe extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.getRecipeById(id);
    }
  }

  onDelete = id => {
    this.props.deleteRecipe(id, this.props.history);
  };

  onLike = id => {
    this.props.likeRecipe(id);
  };

  render() {
    const { recipe, loading } = this.props.recipe;
    const { auth } = this.props;

    let comments;
    if (recipe && recipe.comments) {
      comments = recipe.comments.map(comment => (
        <section key={comment._id} className="comment">
          <div className="comment__user">
            <div className="comment__img">
              <img
                src={`../${comment.profileImage}`}
                alt="profile"
                className="comment__img__img"
              />
            </div>
            <p className="comment__name">{comment.name}</p>
          </div>

          <p className="comment__comment">{comment.text}</p>
        </section>
      ));
    }

    let content;
    let Like;
    if (recipe && recipe.likes) {
      if (recipe.likes.filter(like => like.user === auth.user.id).length > 0) {
        Like = HeartRed;
      } else {
        Like = Heart;
      }
    }

    // test
    if (recipe === null || loading) {
      content = <Spinner />;
    } else {
      content = (
        <div>
          <section className="post">
            {recipe.user === auth.user.id ? (
              <button
                type="button"
                className="btn-danger"
                onClick={this.onDelete.bind(this, recipe._id)}
              >
                Delete
              </button>
            ) : null}

            <div className="post__img">
              <img
                src={`../${recipe.recipeImage}`}
                alt="recipe"
                className="post__img__img"
              />
            </div>
            <div className="post__infos">
              <p className="post__title">{recipe.title}</p>
              <div className="post__cooking">
                <p className="post__cookingTitle">Cooking Time</p>
                <p className="post__time">{recipe.time} min</p>
              </div>
            </div>
            <div className="post__how">
              <p className="post__howTitle">Instructions</p>
              <p className="post__details">{recipe.text}</p>
            </div>
            <div className="post__likes">
              <img
                src={Like}
                alt="heart icon"
                className="post__heart"
                onClick={this.onLike.bind(this, recipe._id)}
              />

              <p className="post__number">
                {recipe.likes ? (
                  <span>{recipe.likes.length}</span>
                ) : (
                  <span>0</span>
                )}
              </p>
            </div>
            {comments}
            <Comment id={recipe._id} />
          </section>
          {}
        </div>
      );
    }

    return (
      <div>
        <section className="home-hero">
          <Navbar />
        </section>
        {content}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipeById, likeRecipe, deleteRecipe }
)(withRouter(Recipe));
