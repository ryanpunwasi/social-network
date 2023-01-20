const axios = require("axios");
describe("Update tweet operation", () => {
  it("returns a 200 status if logged in and valid tweet id and content provided", () => {
    axios
      .post("http://localhost:8080/login", {
        username: "tom",
        password: "12345678",
      })
      .then(response => {
        const { accessToken } = response.data;
        return axios
          .put("http://localhost:8080/tweets", {
            accessToken,
            tweetId: 1,
            content: "Test tweet!",
          })
          .then(response => {
            expect(response.status).toBe(200);
          });
      });
  });

  it("returns a 401 status if not logged in", () => {
    return axios
      .put("http://localhost:8080/tweets", {
        accessToken: "Invalid access token",
        tweetId: 1,
        content: "Test tweet!",
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });

  it("returns a 406 status if parameters are missing", () => {
    return axios.put("http://localhost:8080/tweets").catch(error => {
      expect(error.response.status).toBe(406);
    });
  });

  it("returns a 406 status if content exceedes 280 characters.", () => {
    axios
      .post("http://localhost:8080/login", {
        username: "tom",
        password: "12345678",
      })
      .then(response => {
        const { accessToken } = response.data;
        return axios
          .post("http://localhost:8080/tweets", {
            accessToken,
            content:
              "This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. This content is too long. ",
          })
          .catch(error => {
            expect(error.response.status).toBe(406);
          });
      });
  });
});
