import Head from "next/head";

export default function Home(): JSX.Element {
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
