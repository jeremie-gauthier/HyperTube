import { responseInterface } from "swr";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export type BaseSWR<Data> = Pick<
  responseInterface<Data, Error>,
  "mutate" | "revalidate" | "error"
> & {
  isLoading: boolean;
  isError: string;
};

export enum API {
  ARCHIVE_ORG = "https://archive.org/",
  OMDB = "https://www.omdbapi.com/",
  PUBLIC_DOMAIN_TORRENTS = "http://publicdomaintorrents.info/",
}

export enum ARCHIVE_ORG {
  ADVANCED_SEARCH = "advancedsearch.php",
  METADATA = "metadata",
}

export enum PUBLIC_DOMAIN_TORRENTS {
  SEARCH_ALL = "nshowcat.html?category=ALL",
  SEARCH_ID = "nshowmovie.html?movieid=",
  AVI_TORRENT_EXT = ".avi.torrent",
}
