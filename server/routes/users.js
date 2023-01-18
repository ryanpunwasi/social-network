const router = require("express").Router();

const users = ["Bob", "Alex", "Will", "Tristan"];

module.exports = db => {
  router.get("/", (req, res) => {
    db.query("SELECT username FROM users").then(result => {
      const users = { ...result.rows[0] };
      return res.json(users);
    });
  });

  return router;
};
