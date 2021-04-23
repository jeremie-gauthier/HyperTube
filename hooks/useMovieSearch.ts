import fetcher from "@/lib/fetcher";
import { Movie } from "@/types/movie";
import { API } from "@/types/requests";
import { useSWRInfinite } from "swr";
import isEmpty from "@ramda/isempty";
import useDebounce from "./useDebounce";
import useSelector from "./useSelector";
import { moviesRoute } from "./api/useMovie";
import useExternalAPI from "./api/useExternalAPI";

const getKey = (source: API, search: string, pageIndex: number) =>
  isEmpty(search)
    ? null
    : `${moviesRoute()}?source=${source}&search=${search}&page=${
        pageIndex + 1
      }`;

export default function useMovieSearch() {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);

  const {
    movies: moviesArchiveOrg,
    isLoading: isArchiveOrgLoading,
    loadMore,
    isReachingEnd,
  } = useArchiveOrgSearch(debouncedSearch);

  const {
    movies: moviesPublicDomain,
    isLoading: publicDomainLoading,
  } = usePublicDomainSearch(debouncedSearch);

  const movies = [...moviesArchiveOrg, ...moviesPublicDomain];
  const isLoading = isArchiveOrgLoading || publicDomainLoading;

  return { movies, isLoading, loadMore, isReachingEnd };
}

const useArchiveOrgSearch = (search: string) => {
  const { data: moviesArchiveOrg, size, setSize, error } = useSWRInfinite<{
    movies: Movie[];
  }>((index) => getKey(API.ARCHIVE_ORG, search, index), fetcher);

  const isLoadingInitialData = search && !moviesArchiveOrg && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 &&
      moviesArchiveOrg &&
      typeof moviesArchiveOrg[size - 1] === "undefined");
  const emptySet = moviesArchiveOrg?.[0]?.movies?.length === 0;
  const isReachingEnd =
    emptySet ||
    (moviesArchiveOrg &&
      moviesArchiveOrg[moviesArchiveOrg.length - 1]?.movies?.length < 50);

  const movies = (
    moviesArchiveOrg?.map((movies) => movies.movies ?? []) ?? []
  ).flat();

  const loadMore = () => {
    if (!isEmpty(search) && !isLoadingMore) setSize((size) => size + 1);
  };

  return { movies, isLoading: isLoadingMore ?? false, loadMore, isReachingEnd };
};

const usePublicDomainSearch = (search: string) => {
  const { data, isValidating } = useExternalAPI<{
    movies: Movie[];
  }>({
    source: API.PUBLIC_DOMAIN_TORRENTS,
    search,
  });
  const movies = (data?.movies ?? []) as Movie[];

  return { movies, isLoading: isValidating };
};
