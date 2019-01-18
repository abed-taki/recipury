const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  profileImage: {
    type: String
  }
});

module.exports = ProfileImage = mongoose.model(
  "profileImage",
  ProfileImageSchema
);
