const express = require("express");

const router = express.Router();

// route    api/users/test
// desc     test
// access   public
router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
