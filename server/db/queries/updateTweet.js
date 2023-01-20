const updateTweet = (db, id, content) => {
  return db
    .query(`UPDATE tweets SET content = $1 WHERE id = $2`, [content, id])
    .then(result => result.rowCount)
    .catch(err => {
      return err;
    });
};

module.exports = updateTweet;
