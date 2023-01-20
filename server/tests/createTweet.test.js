const axios = require("axios");
describe("Create tweet operation", () => {
  it("returns a 200 status if logged in and valid content provided", () => {
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
            content: "Test tweet!",
          })
          .then(response => {
            expect(response.status).toBe(200);
          });
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

  it("returns a 401 status if not logged in", () => {
    return axios
      .post("http://localhost:8080/tweets", {
        accessToken: "Invalid access token",
        content: "Test tweet!",
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });
});
