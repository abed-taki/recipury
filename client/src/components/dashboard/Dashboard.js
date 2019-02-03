import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getRecipes } from "../../actions/recipeActions";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Spinner from "../common/Spinner";
import RecipeItem from "../recipe/RecipeItem";
import { Link } from "react-router-dom";
import facebook from "../../img/facebook.svg";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
import youtube from "../../img/youtube.svg";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();

    this.props.getRecipes();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { recipes } = this.props.recipe;

    let dashboardContent;
    let recipeContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
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
                <img
                  src={profile.profileImage}
                  alt="profile"
                  className="profile__img__img"
                />
              </div>
              <div className="profile__details">
                <p className="profile__name">{user.name}</p>
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
            <div className="actions">
              <Link
                to="/edit-profile"
                className="actions__primary btn btn-long"
              >
                Edit profile
              </Link>
              <Link
                to="create-recipe"
                className="actions__secondary btn btn-light"
              >
                Create Recipe
              </Link>
            </div>
          </section>
          <section>
            <div className="container">
              <h2 className="second-title">Your Recipes</h2>
            </div>
            <div className="container recipes">{recipeContent}</div>
          </section>
          <Footer />
        </div>
      );
    } else {
      // user has no profile
      dashboardContent = (
        <div>
          <section className="home-hero">
            <Navbar />
          </section>
          <div style={{ textAlign: "center" }}>
            <p className="second-title">Welcom {user.name}</p>
            <p className="second-title">
              Please take the time to create your profile
            </p>
            <Link to="create-profile" className="btn btn-long">
              Create profile
            </Link>
          </div>
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
  { getCurrentProfile, getRecipes }
)(Dashboard);
