const validator = (str, rules) => {
  for (const rule of rules) {
    if (!rule.func(str)) {
      return { error: rule.errorMessage };
    }
  }

  return { error: null };
};

module.exports = validator;
