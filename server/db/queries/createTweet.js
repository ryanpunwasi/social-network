const createTweet = (db, user_id, content) => {
  return db
    .query(
      `INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *`,
      [user_id, content]
    )
    .then(tweet => tweet)
    .catch(() => {
      return null;
    });
};

module.exports = createTweet;
