const router = require("express").Router();

module.exports = db => {
  router.post("/", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = $1 AND password = $2", [
      username,
      password,
    ]).then(result => {
      const user = { ...result.rows[0] };
      return res.json(user);
    });
  });

  return router;
};
