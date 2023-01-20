require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");

module.exports = db => {
  router.get("/tweets", (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
  });

  router.post("/tweets", (req, res) => {});

  router.delete("/tweets", (req, res) => {});

  router.put("/tweets", (req, res) => {});

  return router;
};
