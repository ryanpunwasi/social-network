require("dotenv").config();
const router = require("express").Router();
const getTweet = require("../db/queries/getTweet");
const jwt = require("jsonwebtoken");

module.exports = db => {
  router.get("/:id", (req, res) => {
    const id = req.params.id || null;
    getTweet(db, id).then(tweet => {
      if (tweet) return res.status(200).json({ tweet });
      return res.status(404).send("Tweet not found.");
    });
  });

  router.post("/", (req, res) => {});

  router.delete("/", (req, res) => {});

  router.put("/", (req, res) => {});

  return router;
};
