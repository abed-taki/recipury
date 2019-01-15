const express = require("express");

const router = express.Router();

// route    api/profile/test
// desc     test
// access   public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

module.exports = router;
