import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
// import useSelector from "@/hooks/useSelector";
// import { API } from "@/types/requests";
// import useExternalAPI from "@/hooks/api/useExternalAPI";
// import useDebounce from "@/hooks/useDebounce";
import { Movie, MoviesFromAPI } from "@/types/movie";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import MovieCategories from "@/components/Label/MovieCategories";
import styles from "./movies.module.scss";

type HomeProps = {
  movies: Movie[];
};

function Home({ movies }: HomeProps) {
  // const search = useSelector((state) => state.movie.searchInput);
  // const debouncedSearch = useDebounce(search, 500);

  return (
    <ScrollBar>
      <main className={styles.container}>
        <MovieCategories selectedCategory={null} />
        <h1>Movies result will be printed here :)</h1>
        <FlexRow className={styles.mosaicMovies}>
          {(movies ?? []).map((movie) => (
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
  // const api = process.env.HYPERTUBE_API_URL;

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
