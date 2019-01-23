const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = validateRecipeInput = data => {
  let errors = {};

  data.text = isEmpty(data.text) ? "" : data.text;

  if (!Validator.isLength(data.text, { min: 10, max: 500 })) {
    errors.text = "Recipe text must be between 10 and 500 characters";
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
