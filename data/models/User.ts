// Move back to ../data if needed

import mongoose, { Schema } from "mongoose";
import { User } from "../../types/user";

const UserSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<User>("User", UserSchema);
export default User;
