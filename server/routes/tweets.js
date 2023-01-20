require("dotenv").config();
const router = require("express").Router();

const validator = require("../helpers/validation/validator");
const tweetRules = require("../helpers/validation/tweetRules");
const getTweet = require("../db/queries/getTweet");
const createTweet = require("../db/queries/createTweet");
const jwt = require("jsonwebtoken");

module.exports = db => {
  router.get("/:id", (req, res) => {
    const id = req.params.id || null;
    getTweet(db, id).then(tweet => {
      if (tweet) return res.status(200).json({ tweet });
      return res.status(404).send("Tweet not found.");
    });
  });

  router.post("/", (req, res) => {
    const content = req.body.content ? req.body.content.trim() : null;
    const accessToken = req.body.accessToken ? req.body.accessToken : null;

    const tweetContentError = validator(content, tweetRules);

    if (tweetContentError.error)
      return res.status(406).send(tweetContentError.error);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);

      createTweet(db, user.id, content).then(tweet => {
        if (tweet) return res.status(200).send("Tweet created!");
        return res.status(404).send("User not found.");
      });
    });
  });

  router.delete("/", (req, res) => {});

  router.put("/", (req, res) => {});

  return router;
};
