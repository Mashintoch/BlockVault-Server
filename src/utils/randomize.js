const randomize = require("randomatic");

const generateString = (length) => randomize("Aa0", length);

module.exports = {
  generateString,
};
