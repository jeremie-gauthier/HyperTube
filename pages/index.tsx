import SiteLayout from "@/components/Layouts/SiteLayout";
import { moviesRoute } from "@/hooks/api/useMovie";
import useSelector from "@/hooks/useSelector";
import fetcher from "@/lib/fetcher";
import { API } from "@/types/requests";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import useDebounce from "@/hooks/useDebounce";
import { Movie, MoviesFromAPI } from "@/types/movie";

type HomeProps = {
  movies: Movie[];
};

function Home({ movies }: HomeProps) {
  const search = useSelector((state) => state.movie.searchInput);
  const debouncedSearch = useDebounce(search, 500);

  const { data: moviesArchiveOrg } = useExternalAPI({
    source: API.ARCHIVE_ORG,
    search: debouncedSearch,
  });
  // console.log(moviesArchiveOrg?.movies.length, moviesArchiveOrg?.movies);

  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <ol className="mt-8 space-y-2">
          {(moviesArchiveOrg?.movies ?? []).map((movie: Movie) => (
            <li key={movie.title}>{movie.title}</li>
          ))}
        </ol>
      </main>
    </div>
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
