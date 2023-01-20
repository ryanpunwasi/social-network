/**
 * ADD RULES TO THIS FILE
 * Each rule is an object with a property called errorMessage and a method called func. The rules are used by validator.js. func is a function that checks the field against some criteria and returns a boolean. errorMessage is the error message to display is func returns false.
 */

const emptyRule = {
  func: function (str) {
    return str;
  },
  errorMessage: "Username must be provided.",
};

const minimumLengthRule = {
  func: function (str) {
    return str.length >= 3 && str.length > 0;
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

module.exports = [
  emptyRule,
  minimumLengthRule,
  maximumLengthRule,
  alphaNumericRule,
];
