const minimumLengthRule = {
  func: function (str) {
    return str.length >= 8;
  },
  errorMessage: "Password must be at least 8 characters long.",
};

module.exports = [minimumLengthRule];
