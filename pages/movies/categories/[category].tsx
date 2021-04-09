import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";
import ScrollBar from "@/components/Scrollbar";
import { FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import React from "react";
import isEmpty from "@ramda/isempty";
import MovieCategories from "@/components/Label/MovieCategories";
import useMovieSearch from "@/hooks/useMovieFilter";
import useMoviePagination from "@/hooks/useMoviePagination";
import MoviesResults from "@/components/MoviesResults";
import styles from "../movies.module.scss";

type HomeProps = {
  movies: Movie[];
  selectedCategory: MovieCategory;
};

function Home({ movies, selectedCategory }: HomeProps) {
  const { t } = useTranslation();
  const { moviesPagination, incrementPagination } = useMoviePagination(
    movies,
    selectedCategory,
  );
  const { moviesFiltered, showMoviesFiltered } = useMovieSearch(movies);
  const moviesToShow = showMoviesFiltered ? moviesFiltered : moviesPagination;
  const hasMoviesNotLoaded =
    !showMoviesFiltered && moviesPagination.length < movies.length;

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={selectedCategory} />
        <MoviesResults
          text={
            isEmpty(moviesToShow)
              ? t("pages.movies.empty_set")
              : t("pages.movies.result", {
                  count: showMoviesFiltered
                    ? moviesFiltered.length
                    : movies.length,
                })
          }
        />
        <MoviesList movies={moviesToShow} />
        <LoadMoreButton
          isVisible={hasMoviesNotLoaded}
          onClick={incrementPagination}
        />
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

const MoviesList = ({ movies }: { movies: Movie[] }) => (
  <FlexRow className={styles.mosaicMovies}>
    {movies.map((movie, idx) => (
      <MovieCard
        // eslint-disable-next-line react/no-array-index-key
        key={`${movie.title}-${movie.year}-${movie.nbDownloads}-${idx}`}
        movie={movie}
      />
    ))}
  </FlexRow>
);

type LoadMoreButtonProps = {
  isVisible: boolean;
  onClick: () => void;
};

const LoadMoreButton = ({ isVisible, onClick }: LoadMoreButtonProps) => {
  const { t } = useTranslation();

  return isVisible ? (
    <FlexRow className="justify-center">
      <button type="button" className={styles.loadMore} onClick={onClick}>
        {t("common.buttons.load_more")}
      </button>
    </FlexRow>
  ) : null;
};
