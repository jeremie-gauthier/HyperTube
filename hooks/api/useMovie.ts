import { ConfigInterface } from "swr";
import { Movie } from "@/types/movie";
import { apiRoute } from "@/lib/helpers";
import useFetch from "./useFetch";

export const moviesRoute = (id?: string) =>
  apiRoute(id ? `/movies/${id}` : `/movies`);

export default function useMovie(id: string, config?: ConfigInterface) {
  return useFetch<Movie>(moviesRoute(id), config);
}
