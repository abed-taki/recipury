const express = require("express");

const router = express.Router();

// route    api/recipes/test
// desc     test
// access   public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

module.exports = router;
