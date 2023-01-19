/**
 *
 * @param {String} str String to validate.
 * @param {Array[rule]} rules Array of rule objects. Rule objects contain an errorMessage property and a func method.
 * @returns {Boolean} True if all rules are passed, false if otherwise.
 */
const validator = (str, rules) => {
  for (const rule of rules) {
    if (!rule.func(str)) {
      return { error: rule.errorMessage };
    }
  }

  return { error: null };
};

module.exports = validator;
