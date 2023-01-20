const axios = require("axios");

describe("Delete tweet operation", () => {
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

  it.skip("returns a 200 status if valid if logged in, valid tweet id is provided, and tweet was created by logged in user", () => {
    // IMPLEMENT
  });
});
