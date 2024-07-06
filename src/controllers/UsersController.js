import User from "../models/User";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";

class UsersController {
  @TryCatchErrorDecorator
  static async index(req, res) {
    const users = await User.find().select("_id name email");

    res.json(users);
  }
}

export default UsersController;
