/**
 * ADD RULES TO THIS FILE
 * Each rule is an object a property called errorMessage and a method called func. The rules are used by validator.js. func is a function that checks the field against some criteria and returns a boolean. errorMessage is the error message to display is func returns false.
 */

const emptyRule = {
  func: function (str) {
    return str;
  },
  errorMessage: "Password must be provided.",
};

const minimumLengthRule = {
  func: function (str) {
    return str.length >= 8;
  },
  errorMessage: "Password must be at least 8 characters long.",
};

module.exports = [emptyRule, minimumLengthRule];
