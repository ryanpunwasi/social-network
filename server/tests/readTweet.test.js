const axios = require("axios");
describe("Read tweet operation", () => {
  it("returns a 200 status if valid tweet id provided", () => {
    return axios.get("http://localhost:8080/tweets/1").then(response => {
      expect(response.status).toBe(200);
    });
  });

  it("returns a 406 status if invalid tweet id given", () => {
    return axios.get("http://localhost:8080/tweets/invalid").catch(error => {
      expect(error.response.status).toBe(406);
    });
  });

  it("returns a 404 status if tweet id not found", () => {
    return axios.get("http://localhost:8080/tweets/99").catch(error => {
      expect(error.response.status).toBe(404);
    });
  });
});
