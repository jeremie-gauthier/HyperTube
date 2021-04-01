import { Movie } from "@/types/movie";
import React from "react";

const PAGE_RANGE = 50;

export default function useMoviePagination(
  movies: Movie[],
  ...deps: unknown[]
) {
  const [page, setPage] = React.useState(1);
  const moviesPagination = movies.slice(0, page * PAGE_RANGE);
  React.useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  const incrementPagination = () => setPage((page) => page + 1);

  return { moviesPagination, incrementPagination };
}
