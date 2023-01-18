const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Required for password hashing

module.exports = db => {
  router.post("/", function (req, res, next) {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, hashedPassword]
    ).then(result => res.json({ success: "Yes" }));
  });

  return router;
};
