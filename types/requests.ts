import { responseInterface } from "swr";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export type BaseSWR<Data> = Pick<
  responseInterface<Data, Error>,
  "mutate" | "revalidate" | "error"
> & {
  isLoading: boolean;
  isError: string;
};

export enum API {
  ARCHIVE_ORG = "https://archive.org/advancedsearch.php",
  OMDB = "https://www.omdbapi.com/",
  YTS = "https://yts.mx/api/v2/movie_details.json",
}
