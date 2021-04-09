import { Document } from "mongoose";
import { Movie } from "./movie";
import { User } from "./user";

export type Comment = {
  id: string;
  userId: string;
  movieId: string;
  comment: string;
  date: string;
};

export type MongoComment = Document & Comment;

export type UserCommentsOnMovies = {
  user: User;
  comment: Comment;
  movie: Movie;
};

export type CommentsForMovie = {
  comment: Comment;
  user: User;
};
