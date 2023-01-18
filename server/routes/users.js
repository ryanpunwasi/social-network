const router = require("express").Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query("SELECT username FROM users").then(result => {
      const users = { ...result.rows[0] };
      return res.json(users);
    });
  });

  return router;
};
