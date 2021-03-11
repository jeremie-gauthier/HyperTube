import { API } from "@/types/requests";
import fetcher from "../fetcher";
import ExternalAPI from "./ExternalAPI";

export default class ArchiveOrgAPI extends ExternalAPI {
  private baseURL: string;

  constructor() {
    const apiKey = process.env.OMDB_API_KEY;

    super(API.OMDB, apiKey);
    this.baseURL = `${this._domain}?apikey=${this._key}`;
  }

  async get(search: string) {
    const options = "type=movie&r=json";
    const url = `${this.baseURL}&s=${search}&${options}`;
    try {
      console.log(url, search);
      const { Search } = await fetcher(url);
      return Search;
    } catch (error) {
      return [];
    }
  }

  async getById(id: string) {
    const url = `${this.baseURL}&\
      i=${id}&\
      r=json`;
    try {
      const response = await fetcher(url);
      return response;
    } catch (error) {
      return [];
    }
  }
}
