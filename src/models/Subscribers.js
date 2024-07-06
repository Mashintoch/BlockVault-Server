import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const WaitlistSchema = new Schema(
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

export default mongoose.model("Waitlist", WaitlistSchema);
