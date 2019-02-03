import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import CreateField from "../common/CreateField";
import AreaField from "../common/AreaField";
import SelectField from "../common/SelectField";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      status: "",
      bio: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      profileImage: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      // if empty make empty string
      profile.bio = isEmpty(profile.bio) ? "" : profile.bio;
      profile.social = isEmpty(profile.social) ? {} : profile.social;
      profile.facebook = isEmpty(profile.social.facebook)
        ? ""
        : profile.social.facebook;
      profile.twitter = isEmpty(profile.social.twitter)
        ? ""
        : profile.social.twitter;
      profile.instagram = isEmpty(profile.social.instagram)
        ? ""
        : profile.social.instagram;
      profile.youtube = isEmpty(profile.social.youtube)
        ? ""
        : profile.social.youtube;

      // set to state
      this.setState({
        handle: profile.handle,
        status: profile.status,
        bio: profile.bio,
        facebook: profile.facebook,
        twitter: profile.twitter,
        instagram: profile.instagram,
        youtube: profile.youtube,
        profileImage: profile.profileImage
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      handle,
      status,
      bio,
      facebook,
      twitter,
      youtube,
      instagram,
      profileImage
    } = this.state;

    let formData = new FormData();

    formData.append("handle", handle);
    formData.append("status", status);
    formData.append("bio", bio);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("youtube", youtube);
    formData.append("instagram", instagram);
    formData.append("profileImage", profileImage);

    this.props.createProfile(formData, this.props.history);
  };

  onChange = e => {
    switch (e.target.name) {
      case "profileImage":
        this.setState({ profileImage: e.target.files[0] });

        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const { errors } = this.state;
    const options = [
      { label: "Cooking level *", value: 0 },
      { label: "Beginner", value: "Beginner" },
      { label: "Mid Level", value: "Mid Level" },
      { label: "Expert", value: "Expert" }
    ];
    return (
      <div>
        <section className="home-hero">
          <Navbar />
        </section>
        <h3 className="third-title">Edit Your Profile</h3>
        <h3 className="third-title" style={{ fontSize: "18px" }}>
          Fields marked with * are required
        </h3>

        <form className="create-form" onSubmit={this.onSubmit}>
          <section className="create">
            <CreateField
              type="text"
              name="handle"
              placeholder="Handle *"
              info="A unique handle for your profile URL"
              onChange={this.onChange}
              value={this.state.handle}
              error={errors.handle}
            />
            <SelectField
              name="status"
              info="Select your cooking level"
              options={options}
              onChange={this.onChange}
              value={this.state.status}
              error={errors.status}
            />

            <AreaField
              name="bio"
              placeholder="About you"
              info="Tell us a little bit about yourself."
              onChange={this.onChange}
              value={this.state.bio}
              error={errors.bio}
            />
          </section>
          <section className="socials">
            <p className="socials__info">
              Add your social media links (make sure the URL starts with
              http://)
            </p>
            <div className="socials__link">
              <CreateField
                type="text"
                name="facebook"
                placeholder="Facebook"
                onChange={this.onChange}
                value={this.state.facebook}
                error={errors.facebook}
              />
            </div>
            <div className="socials__link">
              <CreateField
                type="text"
                name="twitter"
                placeholder="Twitter"
                onChange={this.onChange}
                value={this.state.twitter}
                error={errors.twitter}
              />
            </div>
            <div className="socials__link">
              <CreateField
                type="text"
                name="youtube"
                placeholder="Youtube"
                onChange={this.onChange}
                value={this.state.youtube}
                error={errors.youtube}
              />
            </div>
            <div className="socials__link">
              <CreateField
                type="text"
                name="instagram"
                placeholder="Instagram"
                onChange={this.onChange}
                value={this.state.instagram}
                error={errors.instagram}
              />
            </div>
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
              Edit your profile image
            </h3>
            <input type="file" name="profileImage" onChange={this.onChange} />
            <input type="submit" className="btn-submit" value="Next step" />
          </section>
        </form>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
