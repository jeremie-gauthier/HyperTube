import { Movie } from "@/types/movie";
import { API } from "@/types/requests";
import useExternalAPI from "./api/useExternalAPI";
import useDebounce from "./useDebounce";
import useSelector from "./useSelector";

export default function useMovieSearch(initialData: Movie[]) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);

  const { data: movies } = useExternalAPI<{ movies: Movie[] }>(
    {
      source: API.ARCHIVE_ORG,
      search: debouncedSearch,
    },
    {
      initialData: { movies: initialData },
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    },
  );

  return movies?.movies ?? [];
}
