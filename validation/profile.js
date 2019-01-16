const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateProfileInput = data => {
  let errors = {};

  data.handle = isEmpty(data.handle) ? "" : data.handle;

  if (!Validator.isLength(data.handle, { min: 3, max: 30 })) {
    errors.handle = "Profile URL must be between 3 and 30 characters";
  }

  if (isEmpty(data.handle)) {
    errors.handle = "Profile URL field is required";
  }

  if (isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
    errors.facebook = "Not a valid URL";
  }

  if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
    errors.instagram = "Not a valid URL";
  }

  if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
    errors.twitter = "Not a valid URL";
  }

  if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
    errors.youtube = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
