import Head from "next/head";
import SiteLayout from "@/components/Layouts/SiteLayout";

function Movies() {
  return (
    <div>
      <Head>
        <title>Movie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-black">Welcome to Movie page</h1>
      </main>
    </div>
  );
}

Movies.Layout = SiteLayout;

export default Movies;
