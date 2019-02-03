import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
import { getRecipes } from "../../actions/recipeActions";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Spinner from "../common/Spinner";
import RecipeItem from "../recipe/RecipeItem";
//import { Link } from "react-router-dom";
import facebook from "../../img/facebook.svg";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
import youtube from "../../img/youtube.svg";

class Profile extends Component {
  componentDidMount() {
    const handle = this.props.match.params.handle;
    if (handle) {
      this.props.getProfileByHandle(handle);
    }

    this.props.getRecipes();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { recipes } = this.props.recipe;

    // test

    let dashboardContent;
    let recipeContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      const image = profile.profileImage;
      // test fro recipes

      if (recipes === null || loading) {
        recipeContent = <Spinner />;
      } else {
        const userRecipes = recipes.filter(
          recipe => recipe.handle === profile.handle
        );

        recipeContent = userRecipes.map(recipe => (
          <RecipeItem key={recipe._id} recipe={recipe} />
        ));
      }

      // user has a profile
      dashboardContent = (
        <div>
          <section className="home-hero">
            <Navbar />
            <div className="container profile">
              <div className="profile__img">
                <img src={image} alt="profile" className="profile__img__img" />
              </div>
              <div className="profile__details">
                <p className="profile__name">{profile.user.name}</p>
                <p className="profile__status">{profile.status} cook</p>
                {profile.social ? (
                  <div className="profile__social">
                    {profile.social.facebook ? (
                      <a href={profile.social.facebook}>
                        <img src={facebook} alt="facebook" />
                      </a>
                    ) : null}
                    {profile.social.twitter ? (
                      <a href={profile.social.twitter}>
                        <img src={twitter} alt="twitter" />
                      </a>
                    ) : null}
                    {profile.social.instagram ? (
                      <a href={profile.social.instagram}>
                        <img src={instagram} alt="instagram" />
                      </a>
                    ) : null}
                    {profile.social.youtube ? (
                      <a href={profile.social.youtube}>
                        <img src={youtube} alt="youtube" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <p className="profile__bio">{profile.bio}</p>
            </div>
          </section>
          <section>
            <div className="container">
              <h2 className="second-title">Recipes by {profile.user.name}</h2>
            </div>
            <div className="container recipes">{recipeContent}</div>
          </section>

          <Footer />
        </div>
      );
    }

    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getRecipes }
)(Profile);
