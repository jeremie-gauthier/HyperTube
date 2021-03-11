import SiteLayout from "@/components/Layouts/SiteLayout";
import MovieCard from "@/components/MovieCard";
import mockMovies from "@/tests/__mocks__/movies";

function Home() {
  return (
    <main className="relative">
      <MovieCard movie={mockMovies[0]} />
      <MovieCard movie={mockMovies[0]} />
      <MovieCard movie={mockMovies[0]} />
      <h1 className="text-black">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </main>
  );
}

Home.Layout = SiteLayout;
export default Home;
