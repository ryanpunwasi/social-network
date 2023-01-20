const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Required for password hashing

// Modules for validation
const validator = require("../helpers/validation/validator");
const usernameRules = require("../helpers/validation/usernameRules");
const passwordRules = require("../helpers/validation/passwordRules");

module.exports = db => {
  router.post("/", function (req, res) {
    const username = req.body.username ? req.body.username.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";

    // Validate username and password
    const usernameError = validator(username, usernameRules);
    const passwordError = validator(password, passwordRules);

    // Send 406 if username and password do not meet format criteria
    if (usernameError.error) {
      return res.status(406).send(usernameError.error);
    }

    if (passwordError.error) {
      return res.status(406).send(passwordError.error);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert new user into database
    db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    )
      .then(() => res.status(200).send("Registration successful."))
      .catch(() => {
        return res.status(409).send("Username not available.");
      });
  });

  return router;
};
