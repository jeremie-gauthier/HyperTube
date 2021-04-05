import {
  ArchiveOrgMetadata,
  ArchiveOrgMovie,
  ArchiveOrgMovieStandardized,
  ArchiveOrgResponse,
  Movie,
  OmdbMovieFound,
  POSTER_DEFAULT,
} from "@/types/movie";
import { API, ARCHIVE_ORG } from "@/types/requests";
import fetcher from "../fetcher";
import {
  omdbValueOrDefault,
  promiseRetry,
  promiseTimeout,
  tryCatchSync,
} from "../helpers";
import ExternalAPI from "./ExternalAPI";
import OMDB from "./OMDB";

export default class ArchiveOrgAPI extends ExternalAPI {
  private _advancedSearch: string;

  private _metadata: string;

  constructor() {
    super(API.ARCHIVE_ORG);

    this._advancedSearch = ARCHIVE_ORG.ADVANCED_SEARCH;
    this._metadata = ARCHIVE_ORG.METADATA;
  }

  async get(search?: string, category?: string | null) {
    const url = `${this._domain}${this._advancedSearch}?\
      q=collection:feature_films AND mediatype:movies AND title:${
        search ?? ""
      } AND subject:${category ?? "*"}&\
      fl[]=title&\
      fl[]=year&\
      fl[]=downloads&\
      fl[]=description&\
      fl[]=identifier&\
      fl[]=runtime&\
      sort[]=downloads desc&\
      output=json`;
    const { response } = await fetcher<ArchiveOrgResponse>(url);
    return response.docs;
  }

  private static async _getDetails(movies: ArchiveOrgMovieStandardized[]) {
    const omdbAPI = new OMDB();
    const moviesWithOmdbDetails = await Promise.all(
      movies.map(async (movie) => {
        try {
          const movieDetails = await promiseTimeout(
            () => omdbAPI.getByTitleAndYear(movie.title, movie.year),
            2000,
          );
          if (OmdbMovieFound(movieDetails)) {
            const movieDetailsStandardized = OMDB.standardize(movieDetails);
            return {
              ...movie,
              ...movieDetailsStandardized,
              runtime:
                movie.runtime ??
                omdbValueOrDefault(movieDetailsStandardized?.runtime),
            } as Movie;
          }
          return {
            ...movie,
            year: movie.year ?? null,
            runtime: movie.runtime ?? null,
          } as Movie;
        } catch (error) {
          return movie as Movie;
        }
      }),
    );
    return moviesWithOmdbDetails;
  }

  async getWithDetails(search?: string, category?: string | null) {
    const movies = await this.get(search, category);
    const moviesStandardized = movies.map((movie) =>
      ArchiveOrgAPI.standardize(movie),
    );
    const moviesWithOmdbDetails = await ArchiveOrgAPI._getDetails(
      moviesStandardized,
    );
    return moviesWithOmdbDetails;
  }

  private async _poke(category: string) {
    const url = `${this._domain}${this._advancedSearch}?\
    q=collection:feature_films AND mediatype:movies AND subject:${category}&\
    rows=1&\
    page=1&\
    output=json`;
    const { response } = await fetcher<ArchiveOrgResponse>(url);
    return response.numFound;
  }

  private async _detailsCompletion(movies: Movie[], category: string | null) {
    const RETRIES = 5;
    const DELAY_RETRY = 2000;

    return Promise.all(
      movies.map(async (movie) => {
        // no picture from OMDB but have an ArchiveOrg id
        let pictureFromMetaData = POSTER_DEFAULT;
        if (!movie.picture && movie.archiveOrgIdentifier) {
          const metadata = await promiseRetry(
            () => this.getMetaData(movie.archiveOrgIdentifier as string),
            RETRIES,
            DELAY_RETRY,
          );
          if (metadata) {
            const iaDir =
              metadata.d1?.concat(metadata.dir) ??
              metadata.d2?.concat(metadata.dir);
            const res = await fetch(`http://${iaDir}/__ia_thumb.jpg`);
            pictureFromMetaData = res.ok
              ? `http://${iaDir}/__ia_thumb.jpg`
              : POSTER_DEFAULT;
          }
        }
        return {
          ...movie,
          category: movie.category ?? category,
          picture: movie.picture ?? pictureFromMetaData,
        } as Movie;
      }),
    );
  }

  async getAllMoviesIdentifierFromCategory(category: string) {
    console.log(`[${category}]: is poking ArchiveOrg`);
    const nbMovies = await this._poke(category);
    console.log(`[${category}]: has ${nbMovies} items`);
    const url = `${this._domain}${this._advancedSearch}?\
    q=\
      collection:feature_films AND\
      mediatype:movies AND\
      subject:${category} AND\
      downloads:[10000 TO 3000000]&\
    fl[]=identifier&\
    rows=${nbMovies}&\
    page=1&\
    output=json`;
    console.log(`[${category}]: is fetching all items`);
    const {
      response: { docs },
    } = await fetcher<ArchiveOrgResponse>(url);
    console.log(`[${category}]: standardize all items`);
    const identifiers = docs.map((doc) => doc.identifier);
    return identifiers;
  }

  async getMoviesDetails(docs: ArchiveOrgMovie[], category: string | null) {
    console.log(`[${category}]: standardize all items`);
    const movies = docs.map((movie) => ArchiveOrgAPI.standardize(movie));
    console.log(`[${category}]: dedupe duplicate items`);
    const dedupeMovies = movies
      .filter((movie, idx) =>
        movies.findIndex((m) =>
          m.title?.toString().match(new RegExp(movie.title, "i")),
        ) === idx
          ? movie
          : null,
      )
      .filter((movie) => movie !== null);
    console.log(`[${category}]: get details from OMDB`);
    const moviesWithOmdbDetails = await ArchiveOrgAPI._getDetails(dedupeMovies);
    console.log(`[${category}]: complete missing OMDB details`);
    const moviesWithMaxLevelOfDetails = await this._detailsCompletion(
      moviesWithOmdbDetails,
      category,
    );
    console.log(`[${category}]: DONE`);
    return moviesWithMaxLevelOfDetails;
  }

  async getAllFromId(id: string) {
    const url = `${this._domain}${this._advancedSearch}?\
    q=\
      collection:feature_films AND\
      mediatype:movies AND\
      identifier:${id}&\
    fl[]=title&\
    fl[]=year&\
    fl[]=downloads&\
    fl[]=description&\
    fl[]=identifier&\
    fl[]=runtime&\
    output=json`;
    const {
      response: { docs },
    } = await fetcher<ArchiveOrgResponse>(url);
    const moviesDetails = await this.getMoviesDetails(docs, null);
    return moviesDetails[0];
  }

  // eslint-disable-next-line max-statements
  async getAllCompileTime(category: string) {
    console.log(`[${category}]: is poking ArchiveOrg`);
    const nbMovies = await this._poke(category);
    console.log(`[${category}]: has ${nbMovies} items`);
    const url = `${this._domain}${this._advancedSearch}?\
    q=\
      collection:feature_films AND\
      mediatype:movies AND\
      subject:${category} AND\
      downloads:[10000 TO 3000000]&\
    fl[]=title&\
    fl[]=year&\
    fl[]=downloads&\
    fl[]=description&\
    fl[]=identifier&\
    fl[]=runtime&\
    sort[]=downloads desc&\
    rows=${nbMovies}&\
    page=1&\
    output=json`;
    console.log(`[${category}]: is fetching all items`);
    const {
      response: { docs },
    } = await fetcher<ArchiveOrgResponse>(url);
    const moviesDetails = await this.getMoviesDetails(docs, category);
    return moviesDetails;
  }

  // CALL THIS ON THE MOVIE PAGE TO GET TORRENT FILE
  async getMetaData(identifier: string) {
    const url = `${this._domain}${this._metadata}/${identifier}`;
    const response = await fetcher<ArchiveOrgMetadata>(url);
    return response;
  }

  // Movie titles are not always good formatted on archive.org
  static movieParser(title: string, year?: string) {
    // Any words followed by an open bracket
    const titleRgx = /^[\w\s]+(?=\()/;
    const parsedTitle = tryCatchSync(
      () => title.match(titleRgx),
      () => null,
    );
    if (!parsedTitle) {
      return { title, year: year ?? null };
    }

    if (!year) {
      // Any sequence of four digits surrounded by brackets and possible chars
      const yearRgx = /(?<=[(\W*])\d{4}(?=[\W*)])/;
      const parsedYear = tryCatchSync(
        () => title.match(yearRgx),
        () => null,
      );
      if (parsedYear) {
        return { title: parsedTitle[0], year: parsedYear[0] };
      }
    }

    return { title: parsedTitle[0], year: null };
  }

  static runtimeParser(runtime?: string): { runtime: string | null } {
    if (!runtime) {
      return { runtime: null };
    }

    // Formatted like `MM min.`
    if (runtime.includes("min.")) {
      return { runtime: runtime.slice(0, -1) };
    }

    // Formatted like `HH:MM:SS`
    if (runtime.includes(":")) {
      const splitted = runtime.split(":");

      switch (splitted.length) {
        case 3:
          return {
            runtime: `${
              parseInt(splitted[0], 10) * 60 +
              parseInt(splitted[1], 10) +
              (splitted[2] === "00" ? 0 : 1)
            } min`,
          };
        case 2:
          return {
            runtime: `${
              parseInt(splitted[1], 10) + (splitted[2] === "00" ? 0 : 1)
            } min`,
          };
        case 1:
          return { runtime: `1 min` };
        default:
          return { runtime: null };
      }
    }
    return { runtime: null };
  }

  static standardize(movieFromExternalAPI: ArchiveOrgMovie) {
    const {
      title,
      year,
      description,
      downloads,
      identifier,
      runtime,
    } = movieFromExternalAPI;

    return {
      ...ArchiveOrgAPI.movieParser(title, year),
      ...ArchiveOrgAPI.runtimeParser(runtime),
      synopsis: description ?? null,
      nbDownloads: downloads ?? null,
      archiveOrgIdentifier: identifier ?? null,
    };
  }
}
