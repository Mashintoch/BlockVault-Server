/* eslint-disable import/extensions */
const ValidateService = require("../services/ValidateService")

class Validate {
  static prepare(schema, keyValidate = "body") {
    return async (req, res, next) => {
      try {
        await ValidateService.validate(req[keyValidate], schema);
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

module.exports = Validate;
