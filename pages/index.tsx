import Head from "next/head";
import SiteLayout from "@/components/Layouts/SiteLayout";

function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
