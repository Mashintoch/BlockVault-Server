const User = require("../models/User")
const TryCatchErrorDecorator = require("../decorators/TryCatchErrorDecorator")

class UsersController {
  @TryCatchErrorDecorator
  static async Index(req, res) {
    const users = await User.find().select("_id name email");

    res.json(users);
  }
}

module.exports = UsersController;
