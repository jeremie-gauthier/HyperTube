import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { Comment as CommentType } from "@/types/comment";
import { GetServerSideProps } from "next";
import { FlexRow } from "@/components/Flex";
import CountryFlag from "@/components/CountryFlag";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Comment from "@/components/Comment";
import { useTranslation } from "react-i18next";
import { useSWRInfinite } from "swr";
import ScrollBar from "react-perfect-scrollbar";
import styles from "./user.module.scss";

type UserProfileProps = {
  user: User | null;
  comments: CommentType[];
};

const FETCH_CHUNK_SIZE = 4;
function UserProfile({ user, comments }: UserProfileProps) {
  const { data, error, setSize, size } = useSWRInfinite(
    (index) =>
      `/api/users/${user?.id}/comments?range=${index * FETCH_CHUNK_SIZE}:${
        (index + 1) * FETCH_CHUNK_SIZE
      }`,
    fetcher,
    {
      initialData: [comments],
    },
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < FETCH_CHUNK_SIZE);

  return user === null ? (
    <div>ERROR ON PAGE</div>
  ) : (
    <ScrollBar
      onYReachEnd={() => {
        if (!(isLoadingMore || isReachingEnd)) {
          console.log("YOUHOU");
          setSize((size) => size + 1);
        }
      }}
    >
      <main className={styles.container}>
        <Header user={user} />
        <Informations user={user} />
        <Activity comments={data?.flat() ?? []} />
      </main>
    </ScrollBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.HYPERTUBE_API_URL;
  const { id } = context.query;

  try {
    const init = { method: Methods.GET };
    const [user, comments] = await Promise.all([
      fetcher(`${api}/users/${id}`, init),
      fetcher(`${api}/users/${id}/comments?range=0:${FETCH_CHUNK_SIZE}`, init),
    ]);
    return { props: { user, comments } };
  } catch (error) {
    return { props: { user: null, comments: [] } };
  }
};

UserProfile.Layout = SiteLayout;
export default UserProfile;

const Header = ({ user: { username, picture, language } }: { user: User }) => (
  <FlexRow className={styles.header}>
    <Image
      src={`/img/avatar/avatar${picture}.png`}
      alt="Current profile picture"
      width={75}
      height={75}
      quality={100}
    />
    <h1>{username}</h1>
    <CountryFlag lang={language} />
  </FlexRow>
);

const Informations = ({ user: { firstname, lastname } }: { user: User }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      initialState
      title={<h2>{t("pages.user.informations")}</h2>}
      className={styles.dropdown}
    >
      <Dropdown.Element className={styles.names}>
        <p>{firstname}</p>
        <p>{lastname}</p>
      </Dropdown.Element>
    </Dropdown>
  );
};

const Activity = ({ comments }: { comments: CommentType[] }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      initialState
      title={<h2>{t("pages.user.activites")}</h2>}
      className={`${styles.dropdown} pb-8`}
    >
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Dropdown>
  );
};
