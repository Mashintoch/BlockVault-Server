const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const WaitlistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

WaitlistSchema.plugin(uniqueValidator);

module.exports =  mongoose.model("Waitlist", WaitlistSchema);
