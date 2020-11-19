import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/movies">
        <a href="/movies">Movies</a>
      </Link>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  );
}
