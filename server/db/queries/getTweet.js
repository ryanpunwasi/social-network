const getTweet = (db, id) => {
  return db
    .query(`SELECT id, user_id, content FROM tweets WHERE id = $1`, [id])
    .then(result => {
      if (result.rows.length) {
        const { id, user_id, content } = result.rows[0];
        const tweet = { id, user_id, content };
        return tweet;
      }
      return null;
    });
};

module.exports = getTweet;
