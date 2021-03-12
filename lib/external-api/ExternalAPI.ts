import { API } from "@/types/requests";

export default class ExternalAPI {
  protected readonly _domain: API;

  protected readonly _key?: string;

  constructor(domain: API, key?: string) {
    this._domain = domain;
    this._key = key;
  }
}
