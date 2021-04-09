import { ConfigInterface } from "swr";
import { API } from "@/types/requests";
import isEmpty from "@ramda/isempty";
import useFetch from "./useFetch";
import { moviesRoute } from "./useMovie";

type APIQueryParams = {
  source: API;
  search?: string;
  category?: string | null;
  title?: string;
  year?: string;
};

class QueryParams {
  static format(queryParams: APIQueryParams) {
    const { search, category, source, title, year } = queryParams;
    const queryString = [
      `source=${source}`,
      search && `search=${search}`,
      category && `category=${category}`,
      title && `title=${title}`,
      year && `year=${year}`,
    ];
    return queryString.filter((v) => v).join("&");
  }
}

export default function useExternalAPI<MovieFormExternalAPI>(
  queryParams: APIQueryParams,
  config?: ConfigInterface,
) {
  const canFetch =
    !isEmpty(queryParams.search) ||
    queryParams.category ||
    (queryParams.title && queryParams.year);

  return useFetch<MovieFormExternalAPI>(
    canFetch ? `${moviesRoute()}?${QueryParams.format(queryParams)}` : null,
    config,
  );
}
