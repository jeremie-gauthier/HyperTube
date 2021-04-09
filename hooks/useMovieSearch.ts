import { Movie } from "@/types/movie";
import { API } from "@/types/requests";
import useExternalAPI from "./api/useExternalAPI";
import useDebounce from "./useDebounce";
import useSelector from "./useSelector";

export default function useMovieSearch() {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);

  const {
    data: moviesArchiveOrg,
    isValidating: archiveLoading,
  } = useExternalAPI<{
    movies: Movie[];
  }>({
    source: API.ARCHIVE_ORG,
    search: debouncedSearch,
  });

  const {
    data: moviesPublicDomain,
    isValidating: publicDomainLoading,
  } = useExternalAPI<{
    movies: Movie[];
  }>({
    source: API.PUBLIC_DOMAIN_TORRENTS,
    search: debouncedSearch,
  });

  const movies = [
    ...(moviesArchiveOrg?.movies ?? []),
    ...(moviesPublicDomain?.movies ?? []),
  ];
  const isLoading =
    archiveLoading && publicDomainLoading && movies.length === 0;

  return { movies, isLoading };
}
