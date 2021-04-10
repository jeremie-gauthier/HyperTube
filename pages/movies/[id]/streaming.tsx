import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import styles from "./streaming.module.scss";

type StreamingProps = {
  torrent: any | null;
};

function Streaming({ torrent }: StreamingProps) {
  return torrent ? (
    <main className={styles.container}>
      <video controls src="" />
    </main>
  ) : (
    <p>No torrent found</p>
  );
}

Streaming.Layout = SiteLayout;
export default Streaming;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const api = process.env.HYPERTUBE_API_URL;

  try {
    const torrent = [];
    console.log(`[${id}] OK`);
    return { props: { torrent } };
  } catch (error) {
    console.log(`[${id}] NOT OK => ${error}`);
    return { props: { torrent: null } };
  }
};
