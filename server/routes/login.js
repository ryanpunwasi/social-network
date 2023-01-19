require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Required for password hashing
const jwt = require("jsonwebtoken");
const validator = require("../helpers/validation/validator");
const usernameRules = require("../helpers/validation/usernameRules");
const passwordRules = require("../helpers/validation/passwordRules");

module.exports = db => {
  router.post("/", (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    const usernameError = validator(username, usernameRules);
    const passwordError = validator(password, passwordRules);

    // Perform validation of username and password to avoid uneccessary calls to database
    if (usernameError.error || passwordError.error) {
      return res.status(401).send("Incorrect credentials.");
    }

    db.query("SELECT * FROM users WHERE username = $1", [username]).then(
      result => {
        if (
          result.rows.length &&
          bcrypt.compareSync(password, result.rows[0].password)
        ) {
          const user = { username: username, id: result.rows[0].id };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          return res.status(200).json({ accessToken });
        }
        return res.status(401).send("Incorrect credentials.");
      }
    );
  });

  return router;
};
