const TryCatchErrorDecorator = require("../decorators/TryCatchErrorDecorator")
const ClientError = require("../exceptions/ClientError")
const TokenService = require("../services/TokenService")

class Authorize {
  @TryCatchErrorDecorator
  static async check(req, res, next) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        throw new ClientError("Access token not found in request", 400);
      }

      const verifyData = await TokenService.verifyAccessToken(token);

      if (!verifyData) {
        throw new ClientError("Refresh token invalid or expired", 401);
      }

      req.userId = verifyData.id;
      return next();
    }

    throw new ClientError("Unauthorized", 401);
  }
}

module.exports = Authorize;
