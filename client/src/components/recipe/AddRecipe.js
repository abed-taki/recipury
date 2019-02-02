import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import CreateField from "../common/CreateField";
import AreaField from "../common/AreaField";
import { addRecipe } from "../../actions/recipeActions";
import { getProfileById } from "../../actions/profileActions";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      time: "",
      text: "",
      recipeImage: "",
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.auth.user;
    if (id) {
      this.props.getProfileById(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, time, text, recipeImage } = this.state;
    const { user } = this.props.auth;
    const { handle } = this.props.profile.profile;

    let formData = new FormData();
    formData.append("name", user.name);
    formData.append("title", title);
    formData.append("time", time);
    formData.append("text", text);
    formData.append("recipeImage", recipeImage);
    formData.append("handle", handle);

    this.props.addRecipe(formData, this.props.history);
  };

  onChange = e => {
    switch (e.target.name) {
      case "recipeImage":
        this.setState({ recipeImage: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <section className="home-hero">
          <Navbar />
        </section>
        <h3 className="third-title">Create A Recipe</h3>
        <h3 className="third-title" style={{ fontSize: "18px" }}>
          Fields marked with * are required
        </h3>
        <form className="create-form" onSubmit={this.onSubmit}>
          <section className="create">
            <CreateField
              type="text"
              name="title"
              placeholder="Recipe title *"
              info="Give your recipe a title"
              onChange={this.onChange}
              value={this.state.title}
              error={errors.title}
            />
            <CreateField
              type="text"
              name="time"
              placeholder="Cooking time"
              info="How much time it needs"
              onChange={this.onChange}
              value={this.state.time}
              error={errors.time}
            />
            <AreaField
              name="text"
              placeholder="Instructions *"
              info="Tell us how to prepare this meal"
              onChange={this.onChange}
              value={this.state.text}
              error={errors.text}
            />
            <h3
              className="second-title"
              style={{
                fontSize: "18px",
                marginBottom: "30px",
                marginTop: "30px",
                marginRight: "auto",
                marginLeft: "0"
              }}
            >
              Add Recipe image
            </h3>
            <input type="file" name="recipeImage" onChange={this.onChange} />
            <input type="submit" className="btn-submit" value="Next step" />
          </section>
        </form>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addRecipe, getProfileById }
)(withRouter(AddRecipe));
