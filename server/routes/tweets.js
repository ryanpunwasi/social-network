require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Modules for validating tweet format
const validator = require("../helpers/validation/validator");
const tweetRules = require("../helpers/validation/tweetRules");

// Database CRUD operations
const getTweet = require("../db/queries/getTweet");
const createTweet = require("../db/queries/createTweet");
const updateTweet = require("../db/queries/updateTweet");
const deleteTweet = require("../db/queries/deleteTweet");

module.exports = db => {
  router.get("/:id", (req, res) => {
    const id = req.params.id || null;
    if (!Number.isInteger(parseInt(id)))
      return res.status(406).send("Invalid tweet id.");
    getTweet(db, id).then(tweet => {
      if (tweet) return res.status(200).json({ tweet });
      return res.status(404).send("Tweet not found.");
    });
  });

  router.post("/", (req, res) => {
    const content = req.body.content ? req.body.content.trim() : null;
    const accessToken = req.body.accessToken ? req.body.accessToken : null;

    // Verify tweet content format
    const tweetContentError = validator(content, tweetRules);
    if (tweetContentError.error)
      return res.status(406).send(tweetContentError.error);

    // Authorize with JWT
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);

      createTweet(db, user.id, content).then(tweet => {
        if (tweet) return res.status(200).send("Tweet created!");
        return res.status(404).send("User not found.");
      });
    });
  });

  router.delete("/", (req, res) => {
    const accessToken = req.body.accessToken ? req.body.accessToken : null;
    const tweetId = req.body.tweetId ? req.body.tweetId : null;

    if (!tweetId)
      return res
        .status(406)
        .send("tweetId parameter must be included in request.");

    // Authorize with JWT
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      deleteTweet(db, user.id, tweetId).then(rowCount => {
        if (rowCount) return res.status(200).send("Tweet deleted.");
        return res.status(404).send("Tweet not found.");
      });
    });
  });

  router.put("/", (req, res) => {
    const accessToken = req.body.accessToken ? req.body.accessToken : null;
    const tweetId = req.body.tweetId ? req.body.tweetId : null;
    const newContent = req.body.content ? req.body.content.trim() : null;

    if (!tweetId)
      return res
        .status(406)
        .send("tweetId parameter must be included in request.");

    // Validate tweet content
    const tweetContentError = validator(newContent, tweetRules);
    if (tweetContentError.error)
      return res.status(406).send(tweetContentError.error);

    // Authorize with JWT
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      updateTweet(db, tweetId, newContent).then(rowCount => {
        if (rowCount) return res.status(200).send("Tweet updated.");
        return res.status(404).send("Tweet not found.");
      });
    });
  });

  return router;
};
