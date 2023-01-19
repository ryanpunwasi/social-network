/**
 * ADD RULES TO THIS FILE
 * Each rule is an object a property called errorMessage and a method called func. The rules are used by validator.js. func is a function that checks the field against come criteria and returns a boolean. errorMessage is the error message to display is func returns false.
 */
const minimumLengthRule = {
  func: function (str) {
    return str.length >= 8;
  },
  errorMessage: "Password must be at least 8 characters long.",
};

module.exports = [minimumLengthRule];
