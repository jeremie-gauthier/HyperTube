import {
  ArchiveOrgMetadata,
  ArchiveOrgMovie,
  ArchiveOrgResponse,
} from "@/types/movie";
import { API, ARCHIVE_ORG } from "@/types/requests";
import fetcher from "../fetcher";
import ExternalAPI from "./ExternalAPI";

export default class ArchiveOrgAPI extends ExternalAPI {
  private _advancedSearch: string;

  private _metadata: string;

  constructor() {
    super(API.ARCHIVE_ORG);

    this._advancedSearch = ARCHIVE_ORG.ADVANCED_SEARCH;
    this._metadata = ARCHIVE_ORG.METADATA;
  }

  async get(search: string) {
    const url = `${this._domain}${this._advancedSearch}?\
      q=collection:feature_films AND mediatype:movies AND title:${search}&\
      fl[]=title&\
      fl[]=year&\
      fl[]=downloads&\
      fl[]=description&\
      fl[]=identifier&\
      fl[]=runtime&\
      sort[]=downloads desc&\
      rows=50&\
      page=1&\
      output=json`;
    const { response } = await fetcher<ArchiveOrgResponse>(url);
    return response.docs;
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
    const parsedTitle = title.match(titleRgx);
    if (!parsedTitle) {
      return { title, year };
    }

    if (!year) {
      // Any sequence of four digits surrounded by brackets and possible chars
      const yearRgx = /(?<=[(\W*])\d{4}(?=[\W*)])/;
      const parsedYear = title.match(yearRgx);
      if (parsedYear) {
        return { title: parsedTitle[0], year: parsedYear[0] };
      }
    }

    return { title: parsedTitle[0], year };
  }

  static runtimeParser(runtime?: string) {
    if (!runtime) {
      return { runtime };
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
          return { runtime: undefined };
      }
    }
    return { runtime: undefined };
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
      synopsis: description,
      nbDownloads: downloads,
      archiveOrgIdentifier: identifier,
    };
  }
}
