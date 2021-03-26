import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import useSelector from "@/hooks/useSelector";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import useDebounce from "@/hooks/useDebounce";
import {
  allMovieCategories,
  ArchiveOrgMovieStandardized,
  Movie,
  MovieCategory,
} from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import Label from "@/components/Label";
import { useTranslation } from "react-i18next";
// import { setSelectedCategory } from "@/state/movies/actions";
// import useDispatch from "@/hooks/useDispatch";
import Link from "next/link";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import { API } from "@/types/requests";
import styles from "../movies.module.scss";

type HomeProps = {
  movies: Movie[];
  selectedCategory: MovieCategory;
};

function Home({ movies, selectedCategory }: HomeProps) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useExternalAPI<{
    movies: ArchiveOrgMovieStandardized[];
  }>(
    {
      source: API.ARCHIVE_ORG,
      search: debouncedSearch,
      category: selectedCategory,
      page: 2,
    },
    { initialData: { movies } },
  );
  const moviesArchiveOrg = data?.movies;

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={selectedCategory} />
        <h1>Movies result will be printed here :)</h1>
        <FlexRow className={styles.mosaicMovies}>
          {(moviesArchiveOrg ?? []).map((movie) => (
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
    const moviesFromAPI = await ArchiveOrg.get(
      1,
      "*",
      allMovieCategories[category],
    );
    const movies = moviesFromAPI.map((movie) =>
      ArchiveOrgAPI.standardize(movie),
    );

    console.log(`[${category}] OK =)`);
    return { props: { movies, selectedCategory: category } };
  } catch (error) {
    console.log(`[${category}] NOT OK =( => ${error}`);
    return { props: { movies: null, selectedCategory: category } };
  }
}

const MovieCategories = ({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) => {
  const { t } = useTranslation();
  const MovieCategoriesList = Object.values(MovieCategory).map((category) => ({
    name: category,
    isActive: selectedCategory === allMovieCategories[category],
    label: allMovieCategories[category],
    text: t(`models.movie.category.${category}`),
  }));

  return (
    <FlexRow className={styles.labelsList}>
      {MovieCategoriesList.map((category) => (
        <Link key={category.text} href={`/movies/categories/${category.name}`}>
          <a href={`/movies/categories/${category.name}`}>
            <Label {...category} />
          </a>
        </Link>
      ))}
    </FlexRow>
  );
};
