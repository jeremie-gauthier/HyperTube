// Move back to /data if needed

import { Schema } from "mongoose";

export type TMovie = {
  id: number;
  name: string;
  synopsis: string;
};

export const MovieSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
});
