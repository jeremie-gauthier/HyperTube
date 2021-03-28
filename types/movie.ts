import { Document } from "mongoose";

export const POSTER_DEFAULT = "/img/poster-default.jpg";

export enum MovieCategory {
  COMEDY = "comedy",
  CRIME = "crime",
  DRAMA = "drama",
  FANTASY = "fantasy",
  FILM_NOIR = "film_noir",
  HORROR = "horror",
  MUSICAL = "musical",
  ROMANCE = "romance",
  SCI_FI = "sci_fi",
  WESTERN = "western",
}

// Corresponds to MovieCategory with the right formatting
// so that we can use it in queries
export const allMovieCategories = {
  [MovieCategory.COMEDY]: "Comedy",
  [MovieCategory.CRIME]: "Crime",
  [MovieCategory.DRAMA]: "Drama",
  [MovieCategory.FANTASY]: "Fantasy",
  [MovieCategory.FILM_NOIR]: "Film Noir",
  [MovieCategory.HORROR]: "Horror",
  [MovieCategory.MUSICAL]: "Musical",
  [MovieCategory.ROMANCE]: "Romance",
  [MovieCategory.SCI_FI]: "Sci-Fi",
  [MovieCategory.WESTERN]: "Western",
} as const;

// from both archive.org and OMDB
export type Movie = {
  id: string;
  title: string;
  synopsis: string | null;
  rating: string;
  year: string | null;
  picture: string;
  category: string;
  runtime: string | null;
  director: string;
  actors: string;
  language: string;
  production: string;
  nbDownloads: number;
  archiveOrgIdentifier: string | null;
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
