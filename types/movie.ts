import { Document } from "mongoose";

// from both archive.org and OMDB
export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  rating: string;
  year: string;
  picture: string;
  category: string;
  runtime: string;
  director: string;
  actors: string;
  language: string;
  production: string;
  nbDownloads: number;
  archiveOrgIdentifier?: string;
};

export type MongoMovie = Document & Movie;

export type MoviesFromAPI = {
  movies: Movie[];
};

export type ArchiveOrgResponse = {
  response: {
    numFound: number;
    start: number;
    docs: ArchiveOrgMovie[];
  };
};

export type ArchiveOrgMovie = {
  title: string;
  year: string;
  description: string; // synopsis
  downloads: number; // nbDownloads
  identifier: string; // id in archive.org
  runtime: string;
};

// in order to find the torrent file
// you concatenate (d1 OR d2) AND dir
export type ArchiveOrgMetadata = {
  d1: string;
  d2: string;
  dir: string;
};

export type ArchiveOrgMovieStandardized = Pick<
  Movie,
  "title" | "year" | "synopsis" | "nbDownloads" | "runtime"
>;

enum Bool {
  TRUE = "True",
  FALSE = "False",
}

// This is a Type Guard for OMDB API's responses
export function OmdbMovieFound(
  response: OMDBMovie | OMDBError,
): response is OMDBMovie {
  return response.Response === Bool.TRUE;
}

export type OMBDResponse = OMDBError | OMDBMovie;

export type OMDBError = {
  Response: "False";
  Error: string;
};

export const OMDB_NULL_VALUE = "N/A";

// some fields from OMDB can be "N/A"
export type OMDBMovie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string; // runtime
  Genre: string; // category
  Director: string; // director
  Writer: string;
  Actors: string; // actors
  Plot: string; // synopsis
  Language: string; // language
  Country: string;
  Awards: string;
  Poster: string; // picture
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string; // rating
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string; // production
  Website: string;
  Response: "True";
};

export type OMDBMovieStandardized = Pick<
  Movie,
  | "runtime"
  | "category"
  | "director"
  | "actors"
  | "synopsis"
  | "language"
  | "picture"
  | "rating"
  | "production"
>;
