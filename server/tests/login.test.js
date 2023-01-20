const axios = require("axios");
describe("login", () => {
  it("returns a 200 status if valid credentials provided", () => {
    return axios
      .post("http://localhost:8080/login", {
        username: "tom",
        password: "12345678",
      })
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it("returns a 401 status if wrong password provided", () => {
    return axios
      .post("http://localhost:8080/login", {
        username: "tom",
        password: "1234567",
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });

  it("returns a 401 status if wrong username provided", () => {
    return axios
      .post("http://localhost:8080/login", {
        username: "Wrong username",
        password: "12345678",
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });

  it("returns a 401 status if missing are missing", () => {
    return axios
      .post("http://localhost:8080/login", {
        password: "12345678",
      })
      .catch(error => {
        expect(error.response.status).toBe(401);
      });
  });
});
