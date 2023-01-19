const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Required for password hashing
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
      return res.sendStatus(401);
    }

    db.query("SELECT * FROM users WHERE username = $1", [username]).then(
      result => {
        if (
          result.rows.length &&
          bcrypt.compareSync(password, result.rows[0].password)
        ) {
          const user = { username: username, id: result.rows[0].id };

          return res.json(user);
        }
        return res.sendStatus(401);
      }
    );
  });

  return router;
};
