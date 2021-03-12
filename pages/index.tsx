import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import { moviesRoute } from "@/hooks/api/useMovie";
import useSelector from "@/hooks/useSelector";
import fetcher from "@/lib/fetcher";
import { API } from "@/types/requests";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import useDebounce from "@/hooks/useDebounce";
import {
  ArchiveOrgMovieStandardized,
  Movie,
  MoviesFromAPI,
} from "@/types/movie";

type HomeProps = {
  movies: Movie[];
};

function Home({ movies }: HomeProps) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 500);

  const { data } = useExternalAPI<{
    movies: ArchiveOrgMovieStandardized[];
  }>({
    source: API.ARCHIVE_ORG,
    search: debouncedSearch,
  });
  const moviesArchiveOrg = data?.movies;

  return (
    <main className="relative">
      <h1>Movies result will be printed here :)</h1>
      {(moviesArchiveOrg ?? []).map((movie) => (
        <MovieCard
          key={`${movie.title}-${movie.year}-${movie.nbDownloads}`}
          movie={movie}
        />
      ))}
    </main>
  );
}

Home.Layout = SiteLayout;
export default Home;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;

  try {
    const { movies } = await fetcher<MoviesFromAPI>(
      `${api}${moviesRoute()}?source=${API.ARCHIVE_ORG}&search=${"Dracula"}`,
    );
    return { props: { movies } };
  } catch (error) {
    return { props: { movies: null } };
  }
}
