const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  recipeImage: {
    type: String
  }
});

module.exports = RecipeImage = mongoose.model("recipeImage", RecipeImageSchema);
