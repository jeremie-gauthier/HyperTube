import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import { moviesRoute } from "@/hooks/api/useMovie";
import useSelector from "@/hooks/useSelector";
import fetcher from "@/lib/fetcher";
import { API } from "@/types/requests";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import useDebounce from "@/hooks/useDebounce";
import {
  allMovieCategories,
  ArchiveOrgMovieStandardized,
  Movie,
  MovieCategory,
  MoviesFromAPI,
} from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import Label from "@/components/Label";
import { useTranslation } from "react-i18next";
import { setSelectedCategory } from "@/state/movies/actions";
import useDispatch from "@/hooks/useDispatch";
import styles from "./index.module.scss";

type HomeProps = {
  movies: Movie[];
};

function Home({ movies }: HomeProps) {
  const search = useSelector((state) => state.movie.searchInput);
  const selectedCategory = useSelector((state) => state.movie.selectedCategory);
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useExternalAPI<{
    movies: ArchiveOrgMovieStandardized[];
  }>({
    source: API.ARCHIVE_ORG,
    search: debouncedSearch,
    category: selectedCategory,
    page: 1,
  });
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

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;

  try {
    // const { movies } = await fetcher<MoviesFromAPI>(
    //   `${api}${moviesRoute()}?source=${API.ARCHIVE_ORG}&search=${"Dracula"}`,
    // );
    const { movies } = { movies: [] } as MoviesFromAPI;
    return { props: { movies } };
  } catch (error) {
    return { props: { movies: null } };
  }
}

const MovieCategories = ({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const MovieCategoriesList = Object.values(MovieCategory).map((category) => ({
    text: t(`models.movie.category.${category}`),
    label: allMovieCategories[category],
    isActive: selectedCategory === allMovieCategories[category],
  }));

  const handleSelectCategory = (category: string) =>
    dispatch(
      setSelectedCategory(category === selectedCategory ? null : category),
    );

  return (
    <FlexRow className={styles.labelsList}>
      {MovieCategoriesList.map((category) => (
        <Label
          {...category}
          key={category.text}
          onClick={() => handleSelectCategory(category.label)}
        />
      ))}
    </FlexRow>
  );
};
