import { Schema } from "mongoose";

export type TUser = {
  id: number;
  name: string;
  email: string;
};

export const UserSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
