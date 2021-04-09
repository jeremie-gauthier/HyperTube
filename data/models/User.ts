// Move back to ../data if needed

import { Schema } from "mongoose";

// eslint-disable-next-line import/prefer-default-export
export const UserSchema: Schema = new Schema(
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
