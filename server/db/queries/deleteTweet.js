const deleteTweet = (db, user_id, tweet_id) => {
  return db
    .query(`DELETE FROM tweets WHERE id = $1 AND user_id = $2`, [
      tweet_id,
      user_id,
    ])
    .then(result => {
      return result.rowCount;
    })
    .catch(err => {
      return err;
    });
};

module.exports = deleteTweet;
