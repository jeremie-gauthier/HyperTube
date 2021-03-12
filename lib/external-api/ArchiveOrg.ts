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
      rows=10&\
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
      title,
      year,
      synopsis: description,
      nbDownloads: downloads,
      archiveOrgIdentifier: identifier,
      runtime,
    };
  }
}
