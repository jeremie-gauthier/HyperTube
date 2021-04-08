import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import MovieCategories from "@/components/Label/MovieCategories";
import ArchiveOrg from "@/lib/external-api/ArchiveOrg";
import useMovieSearch from "@/hooks/useMovieSearch";
import useSelector from "@/hooks/useSelector";
import isEmpty from "@ramda/isempty";
import MoviesResults from "@/components/MoviesResults";
import { useTranslation } from "react-i18next";
import useDebounce from "@/hooks/useDebounce";
import styles from "./movies.module.scss";

type MoviesProps = {
  initialData: Movie[];
};

function Movies({ initialData }: MoviesProps) {
  const { t } = useTranslation();
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);
  const movies = useMovieSearch(initialData);

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={null} />
        {!isEmpty(debouncedSearch) && (
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
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.title}-${movie.year}-${movie.nbDownloads}`}
              movie={movie}
            />
          ))}
        </FlexRow>
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
