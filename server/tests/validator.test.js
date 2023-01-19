const validator = require("../helpers/validation/validator");
const usernameRules = require("../helpers/validation/usernameRules");
const passwordRules = require("../helpers/validation/passwordRules");

describe("validator", () => {
  it("returns object with error message if username is less than 3 characters", () => {
    const actual = validator("ab", usernameRules);
    expect(actual.error).toBeTruthy();
  });

  it("returns object with error message if username is more than 20 characters", () => {
    const actual = validator("abcdefghijklmnopqrstuvwxyz", usernameRules);
    expect(actual.error).toBeTruthy();
  });

  it("returns object with error message if username contains non-alphanumeric characters", () => {
    const actual = validator("@bcdefgh", usernameRules);
    expect(actual.error).toBeTruthy();
  });

  it("returns object with null error property if username is valid", () => {
    const actual = validator("abcdefgh", usernameRules);
    expect(actual.error).toBeNull();
  });

  it("returns object with error message if password is less than 8 characters", () => {
    const actual = validator("1234567", passwordRules);
    expect(actual.error).toBeTruthy();
  });

  it("returns object with null error property if password is valid", () => {
    const actual = validator("12345678", passwordRules);
    expect(actual.error).toBeNull();
  });
});
