const axios = require("axios");
describe("register", () => {
  it("returns a 200 status if valid username and password provided", () => {
    const randomInt = Math.floor(Math.random() * 10000000);
    const username = "valid" + randomInt;
    return axios
      .post("http://localhost:8080/register", {
        username: username,
        password: "12345678",
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it("returns a 406 status if invalid password provided", () => {
    return axios
      .post("http://localhost:8080/register", {
        username: "valid",
        password: "1",
      })
      .catch(error => {
        expect(error.response.status).toBe(406);
      });
  });

  it("returns a 406 status if invalid username provided", () => {
    return axios
      .post("http://localhost:8080/register", {
        username: "inv@lid",
        password: "12345678",
      })
      .catch(error => {
        expect(error.response.status).toBe(406);
      });
  });

  it("returns a 409 status if username is unavailable", () => {
    return axios
      .post("http://localhost:8080/register", {
        username: "tom",
        password: "12345678",
      })
      .catch(error => {
        expect(error.response.status).toBe(409);
      });
  });
});
