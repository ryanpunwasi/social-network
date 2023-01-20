const getLastTweetId = db => {
  return db
    .query(`SELECT id FROM tweets ORDER BY id DESC LIMIT 1`)
    .then(result => {
      if (result.rows.length) {
        const { id } = result.rows[0];
        return id;
      }
      return null;
    });
};

module.exports = getLastTweetId;
