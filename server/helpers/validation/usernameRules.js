const minimumLengthRule = {
  func: function (str) {
    return str.length >= 3;
  },
  errorMessage: "Username must be at least 3 characters long.",
};

const maximumLengthRule = {
  func: function (str) {
    return str.length <= 20;
  },
  errorMessage: "Username must be less than 20 characters long.",
};

const alphaNumericRule = {
  func: function (str) {
    return str.match(/^[0-9a-zA-Z]+$/);
  },
  errorMessage: "Username must be contain only alpha-numeric characters.",
};

module.exports = [minimumLengthRule, maximumLengthRule, alphaNumericRule];
