import { Schema } from "mongoose";

export type TUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
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
