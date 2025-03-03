const express = require("express");
const router = express.Router();

/**
 * function to handle login
 */
router.post("/auth", (req, res, next) => {
  let loginData = req.body;
  let username = loginData.username;
  let password = loginData.password;

  if (username && password) {
    req.getConnection(function (err, connection) {
      let data = [username, password];
      console.log(data);
      var query = connection.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        data,
        function (err, rows) {
          if (err) console.log("Error inserting : %s ", err);
          if (rows.length > 0) {
            // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
            // Redirect to home page
            res.redirect("/customers");
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          res.end();
        }
      );
      //             console.log(query.sql); //get raw query
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    // cannot access session here
    res.redirect("/");
  });
});

module.exports = router;
