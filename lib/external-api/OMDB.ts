import { OMBDResponse, OMDBMovie } from "@/types/movie";
import { API } from "@/types/requests";
import fetcher from "../fetcher";
import ExternalAPI from "./ExternalAPI";

export default class OMDBAPI extends ExternalAPI {
  static OPTIONS = "type=movie&r=json";

  private baseURL: string;

  constructor() {
    const apiKey = process.env.OMDB_API_KEY;

    super(API.OMDB, apiKey);
    this.baseURL = `${this._domain}?apikey=${this._key}`;
  }

  async get(search: string) {
    const url = `${this.baseURL}&s=${search}&${OMDBAPI.OPTIONS}`;
    const { Search } = await fetcher<{ Search: OMBDResponse }>(url);
    return Search;
  }

  async getById(id: string) {
    const url = `${this.baseURL}&i=${id}&${OMDBAPI.OPTIONS}`;
    return fetcher<OMBDResponse>(url);
  }

  async getByTitleAndYear(title: string, year: string) {
    const url = `${this.baseURL}&t=${title}&y=${year}&${OMDBAPI.OPTIONS}`;
    return fetcher<OMBDResponse>(url);
  }

  static standardize(movieFromExternalAPI: OMDBMovie | null) {
    if (movieFromExternalAPI === null) {
      return null;
    }

    const {
      Plot,
      imdbRating,
      Poster,
      Genre,
      Runtime,
      Director,
      Actors,
      Language,
      Production,
    } = movieFromExternalAPI;

    return {
      runtime: Runtime,
      category: Genre,
      director: Director,
      actors: Actors,
      synopsis: Plot,
      language: Language,
      picture: Poster,
      rating: imdbRating,
      production: Production,
    };
  }
}
// https://www.omdbapi.com/?apiKey=1c8059d2&s=Jekyll&y=1920&type=movie&r=json
