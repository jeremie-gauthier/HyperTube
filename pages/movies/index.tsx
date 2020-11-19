import Head from "next/head";
import { GetServerSideProps } from "next";
import Layout from "@/components/Layout";

type MoviesProps = {
  name: string;
};

export default function Movies({ name }: MoviesProps): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>I am index.js</h1>
      <h2>His name is: {name}</h2>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      name: data.name,
    }, // will be passed to the page component as props
  };
};
