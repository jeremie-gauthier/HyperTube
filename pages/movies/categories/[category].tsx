import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import useSelector from "@/hooks/useSelector";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import useDebounce from "@/hooks/useDebounce";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import Label from "@/components/Label";
import { useTranslation } from "react-i18next";
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
    movies: Movie[]; // ArchiveOrgMovieStandardized[];
  }>(
    {
      source: API.ARCHIVE_ORG,
      search: debouncedSearch,
      category: selectedCategory,
      page: 1,
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
          {(moviesArchiveOrg ?? []).map((movie, idx) => (
            <MovieCard
              // eslint-disable-next-line react/no-array-index-key
              key={`${movie.title}-${movie.year}-${movie.nbDownloads}-${idx}`}
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
    const movies = await ArchiveOrg.getWithDetails(
      1,
      "*",
      allMovieCategories[category],
    );
    console.log(`[${category}] OK =)`);
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
