import { Movie } from "@/types/movie";
import isEmpty from "@ramda/isempty";
import React from "react";
import useDebounce from "./useDebounce";
import useSelector from "./useSelector";

export default function useMovieFilter(movies: Movie[]) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);
  const [moviesFiltered, setMoviesFiltered] = React.useState(movies);
  const showMoviesFiltered = !isEmpty(debouncedSearch);

  React.useEffect(() => {
    if (showMoviesFiltered) {
      setMoviesFiltered(
        movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            movie.synopsis?.includes(debouncedSearch),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return { moviesFiltered, showMoviesFiltered };
}
