const express = require("express");
const router = express.Router();
var tokens = require('csrf')

/* GET home page. */
router.get("/", (req, res, next) => { 
  res.render("users/login", { title: "Login" });
});

router.get("/login", (req, res, next) => {
  res.render("users/login", { title: "Login" });
});

router.get("/signup", (req, res, next) => {
 const token = tokens.secret();
 console.log(token);
  res.render("users/signup", { title: "Signup", csrfToken: token });
});

module.exports = router;
