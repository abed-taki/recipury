const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//load recipe model
const Recipe = require("../../models/Recipe");
//load user modelù
const User = require("../../models/User");
// load validation
const validateRecipeInput = require("../../validation/recipe");

const router = express.Router();

// route    api/recipes/test
// desc     test
// access   public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

// route    api/recipes
// desc     create recipe
// access   private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // validation
    const { errors, isValid } = validateRecipeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newRecipe = new Recipe({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    });

    newRecipe.save().then(recipe => res.json(recipe));
  }
);

// route    api/recipes/:id
// desc     delete recipe
// access   private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.user.id).then(user => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          // check the owner
          if (recipe.user.toString() !== req.user.id) {
            errors.user = "User not authorized";
            return res.status(401).json(errors);
          }
          //delete
          recipe.remove().then(() => res.json({ sucess: true }));
        })
        .catch(err => {
          errors.recipe = "No recipe found, wrong URL";
          res.status(400).json(errors);
        });
    });
  }
);

// route    api/recipes
// desc     get all recipes
// access   public
router.get("/", (req, res) => {
  const errors = {};
  Recipe.find()
    .then(recipes => {
      if (!recipes) {
        errors.recipes = "There is no recipes";
        return res.status(404).json(errors);
      }
      res.json(recipes);
    })
    .catch(err => res.status(400).json(err));
});

// route    api/recipes/:id
// desc     get recipe by id
// access   public
router.get("/:id", (req, res) => {
  const errors = {};
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (!recipe) {
        errors.recipe = "There is no recipe! wrong URL";
        return res.status(404).json(errors);
      }
      res.json(recipe);
    })
    .catch(err => {
      errors.recipe = "There is no recipe! wrong URL";
      res.status(400).json(errors);
    });
});

// route    api/recipes/like/:id
// desc     like or unlike a recipe
// access   private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findById(req.user.id).then(user => {
      Recipe.findById(req.params.id)
        .then(recipe => {
          //chech if already liked
          if (
            recipe.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // remove user from likes array -- unlike
            const removeIndex = recipe.likes
              .map(like => like.user.toString())
              .indexOf(req.user.id);
            recipe.likes.splice(removeIndex, 1);
          } else {
            //add user to likes array -- like
            recipe.likes.unshift({ user: req.user.id });
          }
          //save
          recipe.save().then(recipe => res.json(recipe));
        })
        .catch(err => {
          errors.recipe = "No recipe found, wrong URL";
          res.status(400).json(errors);
        });
    });
  }
);

// route    api/recipes/comment/:id
// desc     add a comment
// access   private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const { errors, isValid } = validateRecipeInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Recipe.findById(req.params.id)
      .then(recipe => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };
        // add to comment array
        recipe.comments.unshift(newComment);
        //save
        recipe.save().then(recipe => res.json(recipe));
      })
      .catch(err => {
        errors.norecipe = "No recipe found, Wrong URL";
        return res.status(404).json(errors);
      });
  }
);

// route    api/recipes/comment/:id/:comment_id
// desc     delete a comment
// access   private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Recipe.findById(req.params.id)
      .then(recipe => {
        // check if comment exists
        if (
          recipe.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          errors.comment = "no comment found";
          return res.status(404).json(errors);
        }

        // check owner
        const commentId = recipe.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        );
        if (commentId[0].user.toString() !== req.user.id) {
          errors.user = "you are not the owner";
          return res.status(400).json(errors);
        }

        // get comment index
        removeIndex = recipe.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);
        recipe.comments.splice(removeIndex, 1);
        //save
        recipe.save().then(recipe => res.json(recipe));
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

module.exports = router;
