import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import ScrollBar from "@/components/Scrollbar";
import { FlexCol, FlexRow } from "@/components/Flex";
import MovieCategories from "@/components/Label/MovieCategories";
import ArchiveOrg from "@/lib/external-api/ArchiveOrg";
import useMovieSearch from "@/hooks/useMovieSearch";
import useSelector from "@/hooks/useSelector";
import isEmpty from "@ramda/isempty";
import MoviesResults from "@/components/MoviesResults";
import { useTranslation } from "react-i18next";
import useDebounce from "@/hooks/useDebounce";
import Spinner from "@/components/Spinner";
import styles from "./movies/movies.module.scss";

type MoviesProps = {
  initialData: Movie[];
};

function Movies({ initialData }: MoviesProps) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);
  const { movies, isLoading, loadMore, isReachingEnd } = useMovieSearch();
  const canLoadMore = !(isEmpty(movies) || isReachingEnd);

  return (
    <ScrollBar onYReachEnd={() => canLoadMore && loadMore()}>
      <main className={styles.container}>
        <MovieCategories selectedCategory={null} />
        <MoviesList
          movies={isEmpty(debouncedSearch) ? initialData : movies}
          isLoading={isLoading}
          displayCount={!isEmpty(debouncedSearch)}
        />
      </main>
    </ScrollBar>
  );
}

Movies.Layout = SiteLayout;
export default Movies;

export async function getServerSideProps() {
  try {
    const archiveOrg = new ArchiveOrg();
    const movies = await archiveOrg.getBestMovies();
    return { props: { initialData: movies } };
  } catch (error) {
    return { props: { initialData: [] } };
  }
}

type MoviesListProps = {
  movies: Movie[];
  isLoading: boolean;
  displayCount: boolean;
};

const MoviesList = ({ movies, isLoading, displayCount }: MoviesListProps) => {
  const { t } = useTranslation();

  return (
    <>
      {displayCount && (
        <MoviesResults
          text={
            isEmpty(movies)
              ? t("pages.movies.empty_set")
              : t("pages.movies.result", {
                  count: movies.length,
                })
          }
        />
      )}
      <FlexRow className={styles.mosaicMovies}>
        {movies.map((movie, idx) => (
          <MovieCard
            // eslint-disable-next-line react/no-array-index-key
            key={`${movie.title}-${movie.year}-${movie.nbDownloads}_${idx}`}
            movie={movie}
          />
        ))}
      </FlexRow>

      {isLoading && (
        <FlexCol className={styles.loadingMovies}>
          <p>{t("common.buttons.loading")}</p>
          <Spinner />
        </FlexCol>
      )}
    </>
  );
};
