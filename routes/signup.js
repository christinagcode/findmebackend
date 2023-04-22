const express = require("express");
const router = express.Router();
const signupConrtollers = require("../controllers/signup");

router.post("/", signupConrtollers.create);

module.exports = router; 