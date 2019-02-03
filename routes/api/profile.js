const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const path = require("path");

const router = express.Router();

//load profile model
const Profile = require("../../models/Profile");
// load validation
const validateProfileInput = require("../../validation/profile");

//upload image
cloudinary.config({
  cloud_name: require("../../config/keys").cloud_name,
  api_key: require("../../config/keys").api_key,
  api_secret: require("../../config/keys").api_secret
});
//* ************ cloudnary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "profile",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 200, height: 200, crop: "limit" }]
});

const upload = multer({ storage: storage });

// *************

// route    api/profile
// desc     get logged user profile
// access   private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (!profile) {
          errors.profile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);

// route    api/profile/handle/:handle
// desc     get profile by handlle
// access   public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// route    api/profile/user/:user_id
// desc     get profile by id
// access   public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.profile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(errors));
});

// route    api/profile/all
// desc     get all profiles
// access   public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", "name")
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "No profile found";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json(err));
});

// route    api/profile
// desc     create profile
// access   private
router.post(
  "/",

  passport.authenticate("jwt", { session: false }),
  upload.single("profileImage"),
  (req, res) => {
    // validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    // get profile info
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.file) profileFields.profileImage = req.file.url;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create profile
        //check for handle
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "Profile URL already exists";
            return res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        });
      }
    });
  }
);

module.exports = router;
