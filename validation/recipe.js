const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRecipeInput = data => {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;
  data.title = isEmpty(data.title) ? "" : data.title;

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = "Recipe text must be between 10 and 1000 characters";
  }

  if (!Validator.isLength(data.title, { min: 10, max: 40 })) {
    errors.title = "Recipe title must be between 10 and 40 characters";
  }

  if (isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  if (!isEmpty(data.time) && !Validator.isNumeric(data.time)) {
    errors.time = "Cooking Time shoud be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
