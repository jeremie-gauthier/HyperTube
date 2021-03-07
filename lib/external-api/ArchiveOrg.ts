import { API } from "@/types/requests";
import fetcher from "../fetcher";
import ExternalAPI from "./ExternalAPI";

export default class ArchiveOrgAPI extends ExternalAPI {
  constructor() {
    super(API.ARCHIVE_ORG);
  }

  async get(search: string) {
    const url = `${this._domain}?\
      q=mediatype="movies" AND title:"${search}"&\
      fl[]=title&\
      fl[]=date&\
      rows=10&\
      page=1&\
      output=json`;
    try {
      const { response } = await fetcher(url);
      return response.docs;
    } catch (error) {
      return [];
    }
  }
}
