const axios = require("axios");

const createTestTweet = () => {
  axios
    .post("http://localhost:8080/login", {
      username: "tom",
      password: "12345678",
    })
    .then(response => {
      const { accessToken } = response.data;
      return axios.post("http://localhost:8080/tweets", {
        accessToken,
        content: "Tweet to be deleted.",
      });
    });
};

module.exports = createTestTweet;
