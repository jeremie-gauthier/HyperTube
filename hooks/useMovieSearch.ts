import { Movie } from "@/types/movie";
import { API } from "@/types/requests";
import useExternalAPI from "./api/useExternalAPI";
import useDebounce from "./useDebounce";
import useSelector from "./useSelector";

export default function useMovieSearch() {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);

  const { data: movies, isValidating } = useExternalAPI<{
    movies: Movie[];
  }>({
    source: API.ARCHIVE_ORG,
    search: debouncedSearch,
  });

  return {
    movies: movies?.movies ?? [],
    isLoading: isValidating && (movies?.movies ?? []).length === 0,
  };
}
