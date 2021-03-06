import SiteLayout from "@/components/Layouts/SiteLayout";
import { moviesRoute } from "@/hooks/api/useMovie";
import fetcher from "@/lib/fetcher";
import { API } from "@/types/requests";

type HomeProps = {
  movies: any[];
};

function Home({ movies }: HomeProps) {
  return (
    <div>
      <main>
        <h1 className="text-black">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}

Home.Layout = SiteLayout;
export default Home;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;

  console.log(
    `${api}${moviesRoute()}?source=${API.YTS}&search=${"black pearl"}`,
  );
  try {
    const movies = await fetcher<any[]>(
      `${api}${moviesRoute()}?source=${API.ARCHIVE_ORG}&search=${"Dracula"}`,
    );
    return { props: { movies } };
  } catch (error) {
    return { props: { movies: null } };
  }
}
