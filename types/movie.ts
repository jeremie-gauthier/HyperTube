import { Document } from "mongoose";

export enum Category {
  ACTION = "action",
  HORROR = "horror",
}

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  rating: number;
  date: string;
  picture: string;
  category: Category;
};

export type MongoMovie = Document & Movie;
