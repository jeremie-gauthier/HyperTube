import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import useSelector from "@/hooks/useSelector";
import useDebounce from "@/hooks/useDebounce";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import Label from "@/components/Label";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import React from "react";
import isEmpty from "@ramda/isempty";
import styles from "../movies.module.scss";

type HomeProps = {
  movies: Movie[];
  selectedCategory: MovieCategory;
};

const PAGE_RANGE = 50;
function Home({ movies, selectedCategory }: HomeProps) {
  const [page, setPage] = React.useState(1);
  const moviesPagination = movies.slice(0, page * PAGE_RANGE);
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 250);

  const [moviesFiltered, setMoviesFiltered] = React.useState(movies);
  const showMoviesFiltered = !isEmpty(debouncedSearch);

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

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={selectedCategory} />
        <h1>Movies result will be printed here :)</h1>
        <FlexRow className={styles.mosaicMovies}>
          {(showMoviesFiltered ? moviesFiltered : moviesPagination).map(
            (movie, idx) => (
              <MovieCard
                // eslint-disable-next-line react/no-array-index-key
                key={`${movie.title}-${movie.year}-${movie.nbDownloads}-${idx}`}
                movie={movie}
              />
            ),
          )}
        </FlexRow>
        <button
          type="button"
          className="p-2 bg-red"
          onClick={() => setPage((page) => page + 1)}
        >
          LOAD MORE
        </button>
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
    console.log(`[${category}] OK =) ${movies.length}`);
    return {
      props: { movies, selectedCategory: category },
    };
  } catch (error) {
    console.log(`[${category}] NOT OK =( => ${error}`);
    return { props: { movies: [], selectedCategory: category } };
  }
}

const MovieCategories = ({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) => {
  const { t } = useTranslation();
  const MovieCategoriesList = Object.values(MovieCategory);

  return (
    <FlexRow className={styles.labelsList}>
      {MovieCategoriesList.map((category, idx) => (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={`${category}-${idx}`}
          href={`/movies/categories/${category}`}
        >
          <a href={`/movies/categories/${category}`}>
            <Label
              text={t(`models.movie.category.${category}`)}
              isActive={category === selectedCategory}
            />
          </a>
        </Link>
      ))}
    </FlexRow>
  );
};
