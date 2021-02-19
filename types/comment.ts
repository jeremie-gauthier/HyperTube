import { Document } from "mongoose";

export type Comment = {
  id: string;
  userId: string;
  movieId: string;
  comment: string;
  date: string;
};

export type MongoComment = Document & Comment;
