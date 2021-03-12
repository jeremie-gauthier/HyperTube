import { ConfigInterface } from "swr";
import { API } from "@/types/requests";
import useFetch from "./useFetch";
import { moviesRoute } from "./useMovie";

type APIQueryParams = {
  source: API;
  search?: string;
  title?: string;
  year?: string;
};

class QueryParams {
  static format(queryParams: APIQueryParams) {
    const { search, source, title, year } = queryParams;
    return `source=${source}&search=${search ?? ""}&title=${title ?? ""}&year=${
      year ?? ""
    }`;
  }
}

export default function useExternalAPI<MovieFormExternalAPI>(
  queryParams: APIQueryParams,
  config?: ConfigInterface,
) {
  const canFetch =
    queryParams.search || (queryParams.title && queryParams.year);

  return useFetch<MovieFormExternalAPI>(
    canFetch ? `${moviesRoute()}?${QueryParams.format(queryParams)}` : null,
    config,
  );
}
