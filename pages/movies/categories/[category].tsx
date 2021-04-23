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
    <ScrollBar
      onYReachEnd={() => (hasMoviesNotLoaded ? incrementPagination() : null)}
    >
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
      // False positive here, this object is access statically
      // eslint-disable-next-line security/detect-object-injection
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
