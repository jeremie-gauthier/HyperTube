/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import useSelector from "@/hooks/useSelector";
import useDebounce from "@/hooks/useDebounce";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import React from "react";
import isEmpty from "@ramda/isempty";
import MovieCategories from "@/components/Label/MovieCategories";
import styles from "../movies.module.scss";

type HomeProps = {
  movies: Movie[];
  selectedCategory: MovieCategory;
};

const PAGE_RANGE = 50;
function Home({ movies, selectedCategory }: HomeProps) {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(1);
  const moviesPagination = movies.slice(0, page * PAGE_RANGE);
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);
  React.useEffect(() => {
    if (showMoviesFiltered) {
      setMoviesFiltered(
        movies.filter(
          (movie) =>
            movie.title.match(new RegExp(debouncedSearch, "i")) ||
            movie.synopsis?.match(debouncedSearch),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page]);

  const [moviesFiltered, setMoviesFiltered] = React.useState(movies);
  const showMoviesFiltered = !isEmpty(debouncedSearch);
  const moviesToShow = showMoviesFiltered ? moviesFiltered : moviesPagination;
  const hasMoviesNotLoaded = moviesPagination.length < movies.length;

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={selectedCategory} />
        <FlexRow className={styles.mosaicMovies}>
          {isEmpty(moviesToShow) ? (
            <p>No movie found</p>
          ) : (
            moviesToShow.map((movie, idx) => (
              <MovieCard
                // eslint-disable-next-line react/no-array-index-key
                key={`${movie.title}-${movie.year}-${movie.nbDownloads}-${idx}`}
                movie={movie}
              />
            ))
          )}
        </FlexRow>
        {hasMoviesNotLoaded && (
          <FlexRow className="justify-center">
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => setPage((page) => page + 1)}
            >
              {t("common.buttons.load_more")}
            </button>
          </FlexRow>
        )}
      </main>
    </ScrollBar>
  );
}

Home.Layout = SiteLayout;
export default Home;

export async function getStaticPaths() {
  const categories = Object.values(MovieCategory).map((categ) => categ);
  const paths = categories.map((category) => ({ params: { category } }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { category },
}: {
  params: { category: MovieCategory };
}) {
  try {
    const ArchiveOrg = new ArchiveOrgAPI();
    const movies = await ArchiveOrg.getAllCompileTime(
      allMovieCategories[category],
    );
    console.log(`[${category}] OK ${movies.length}`);
    return {
      props: { movies, selectedCategory: category },
    };
  } catch (error) {
    console.log(`[${category}] NOT OK => ${error}`);
    return { props: { movies: [], selectedCategory: category } };
  }
}
