import { OMDBMovie, OmdbMovieFound } from "@/types/movie";
import { API, PUBLIC_DOMAIN_TORRENTS } from "@/types/requests";
import axios from "axios";
import { JSDOM } from "jsdom";
import ExternalAPI from "./ExternalAPI";
import OMDBAPI from "./OMDB";

export default class PublicDomainTorrentsAPI extends ExternalAPI {
  private _searchAll: string;

  private _searchId: string;

  constructor() {
    super(API.PUBLIC_DOMAIN_TORRENTS);

    this._searchAll = PUBLIC_DOMAIN_TORRENTS.SEARCH_ALL;
    this._searchId = PUBLIC_DOMAIN_TORRENTS.SEARCH_ID;
  }

  private static _isAMovieLink = (link: HTMLAnchorElement | HTMLAreaElement) =>
    link.href.startsWith(PUBLIC_DOMAIN_TORRENTS.SEARCH_ID);

  private static _movieMatchSearch = (
    link: HTMLAnchorElement | HTMLAreaElement,
    search: string,
  ) => link.innerHTML.match(new RegExp(search, "i"));

  async get(search?: string) {
    if (!search) return [];

    const url = `${this._domain}${this._searchAll}`;
    const response = await axios.get(url);
    const { document } = new JSDOM(response.data).window;
    const searchMovies = Array.from(document.links).filter(
      (link) =>
        PublicDomainTorrentsAPI._isAMovieLink(link) &&
        PublicDomainTorrentsAPI._movieMatchSearch(link, search),
    );
    const movies = await Promise.all(
      searchMovies.map((movie) => this.getDetails(movie)),
    );
    return movies;
  }

  // eslint-disable-next-line max-statements
  private async _getMovieDetails(data: string) {
    const { document } = new JSDOM(data).window;
    const tables = Array.from(document.getElementsByTagName("tbody"));

    const [details, torrents] = tables.slice(2, 4);
    const title = details.getElementsByTagName("h3")?.[0]?.innerHTML ?? null;
    const imdbId =
      Array.from(details.getElementsByTagName("a"))
        .splice(-1)?.[0]
        ?.href?.match(/tt\d+/)?.[0] ?? null;

    let omdbInfosPromise = null;
    if (imdbId) {
      const OmdbAPI = new OMDBAPI();
      omdbInfosPromise = OmdbAPI.getById(imdbId);
    }

    const synopsis =
      details.getElementsByTagName("td")?.[5]?.innerHTML?.trim() ?? null;
    const imgs = details.getElementsByTagName("img");
    const imgSrc = Array.from(imgs)?.splice(-1)?.[0]?.src ?? null;
    const picture = imgSrc ? `${this._domain}${imgSrc}` : null;

    const categories = Array.from(
      details.getElementsByTagName("td")?.[1]?.getElementsByTagName("a"),
    );
    const category = categories.map((cat) => cat.innerHTML).join(", ");

    const torrentLinks = Array.from(torrents.getElementsByTagName("a"));
    const torrent =
      torrentLinks.find(
        (link) =>
          link?.href?.endsWith(PUBLIC_DOMAIN_TORRENTS.AVI_TORRENT_EXT) ?? false,
      )?.href ?? null;

    const omdbResponse = await omdbInfosPromise;
    let omdbInfos = null;
    if (omdbResponse && OmdbMovieFound(omdbResponse)) {
      omdbInfos = OMDBAPI.standardize(omdbResponse);
    }

    return {
      title,
      category,
      synopsis,
      picture,
      torrent,
      ...(omdbInfos ?? ({} as OMDBMovie)),
    };
  }

  async getDetails(link: HTMLAnchorElement | HTMLAreaElement) {
    const { data } = await axios.get(`${this._domain}${link.href}`);
    const id = link.href.match(/\d+/)?.[0] ?? null;
    const movie = await this._getMovieDetails(data);
    return { ...movie, id };
  }

  async getAllFromId(id: string) {
    const { data } = await axios.get(`${this._domain}${this._searchId}${id}`);
    const movie = await this._getMovieDetails(data);
    return { ...movie, id };
  }
}
