const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const refreshTokens = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    refreshTokens: [refreshTokens]
  },
  {
    timestamps: true
  }
);

mongoose.set("useCreateIndex", true);
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
