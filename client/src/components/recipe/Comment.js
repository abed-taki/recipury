import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profileActions";
import { addComment } from "../../actions/recipeActions";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const userid = this.props.auth.user.id;
    if (userid) {
      this.props.getProfileById(userid);
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props;
    const { user } = this.props.auth;

    const { profile } = this.props.profile;

    const data = {
      text: this.state.text,
      handle: profile.handle,
      profileImage: profile.profileImage,
      name: user.name
    };

    this.props.addComment(id, data);
    this.setState({ text: "" });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <textarea
            name="text"
            placeholder="Post a reply"
            className="post__comment"
            onChange={this.onChange}
            value={this.state.text}
          />
          <div className="error">
            {errors.text ? <p className="error-class">{errors.text}</p> : ""}
          </div>

          <input type="submit" value="Post" className="post__submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipe: state.recipe,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfileById, addComment }
)(Comment);
