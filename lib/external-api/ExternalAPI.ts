import { API } from "@/types/requests";

export default class ExternalAPI {
  protected _domain: API;

  protected _key?: string;

  constructor(domain: API, key?: string) {
    this._domain = domain;
    this._key = key;
  }
}
