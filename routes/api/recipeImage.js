const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");

const router = express.Router();
const multer = require("multer");
const path = require("path");

// load user model
const User = require("../../models/User");
// load profile image model
const RecipeImage = require("../../models/RecipeImage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // allowed extensions
  const fileTypes = /jpeg|jpg|png/;
  //check
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mimetype
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only jpeg images allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 * 2 },
  fileFilter
}).single("recipeImage");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    upload(req, res, err => {
      if (err) {
        errors.recipeImage = "Invalid file type";
        return res.status(400).json(errors);
      } else {
        const recipeImageFields = {};
        recipeImageFields.user = req.user.id;
        if (req.file.path) recipeImageFields.recipeImage = req.file.path;
        RecipeImage.findOne({ user: req.user.id })
          .then(image => {
            if (image) {
              // update
              RecipeImage.findOneAndUpdate(
                { user: req.user.id },
                { $set: recipeImageFields },
                { new: true }
              ).then(recipeImage => res.json(recipeImage));
            } else {
              // save recipe image
              new RecipeImage(recipeImageFields)
                .save()
                .then(recipeImage => res.json(recipeImage))
                .catch(err => res.json(err));
            }
          })
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

module.exports = router;
