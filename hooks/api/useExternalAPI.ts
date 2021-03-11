import { ConfigInterface } from "swr";
import { MoviesFromAPI } from "@/types/movie";
import { API } from "@/types/requests";
import useFetch from "./useFetch";
import { moviesRoute } from "./useMovie";

type APIQueryParams = {
  source: API;
  search: string;
};

class QueryParams {
  static format(queryParams: APIQueryParams) {
    const { search, source } = queryParams;
    return `source=${source}&search=${search}`;
  }
}

export default function useExternalAPI(
  queryParams: APIQueryParams,
  config?: ConfigInterface,
) {
  return useFetch<MoviesFromAPI>(
    `${moviesRoute()}?${QueryParams.format(queryParams)}`,
    config,
  );
}
