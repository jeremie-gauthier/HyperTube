// Move back to ../data if needed

import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/user";

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

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

/* const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model<IUser>("User", UserSchema);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
 */
/* 
Delete this later if it breaks the code above

module.exports = Mongoose.models.User || Mongoose.model("User", UserSchema); */

/* export type TUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  language: TLangs;
  picture: number;
};

export const UserSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

import { Mongoose, Schema, models } from "mongoose";

const UserSchema = new Mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

*/
