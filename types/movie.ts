import { Document } from "mongoose";

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  rating: string;
  date: string;
  picture: string;
  category: string;
  runtime: string;
  director: string;
  actors: string;
  language: string;
  production: string;
  nbDownloads: number;
};

export type MongoMovie = Document & Movie;
