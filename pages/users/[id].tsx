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
import ScrollBar from "react-perfect-scrollbar";
import useComments from "@/hooks/api/useComments";
import Spinner from "@/components/Spinner";
import { usersRoute } from "@/hooks/api/useUser";
import styles from "./user.module.scss";

type UserProfileProps = {
  user: User | null;
  commentsInitial: CommentType[];
};

const FETCH_CHUNK_SIZE = 4;
function UserProfile({ user, commentsInitial }: UserProfileProps) {
  const { comments, isLoadingMoreComments, loadMoreComments } = useComments(
    FETCH_CHUNK_SIZE,
    {
      initialData: [commentsInitial],
    },
  );

  return user === null ? (
    <div>ERROR ON PAGE</div>
  ) : (
    <ScrollBar onYReachEnd={loadMoreComments}>
      <main className={styles.container}>
        <Header user={user} />
        <Informations user={user} />
        <Activity
          comments={comments}
          isLoadingMoreComments={isLoadingMoreComments}
        />
      </main>
    </ScrollBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.HYPERTUBE_API_URL;
  const { id } = context.query;

  try {
    const init = { method: Methods.GET };
    const [user, commentsInitial] = await Promise.all([
      fetcher(`${api}${usersRoute(id as string)}`, init),
      fetcher(`${api}/users/${id}/comments?range=0:${FETCH_CHUNK_SIZE}`, init),
    ]);
    return { props: { user, commentsInitial } };
  } catch (error) {
    return { props: { user: null, commentsInitial: [] } };
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

type ActivityProps = {
  comments: CommentType[];
  isLoadingMoreComments: boolean;
};

const Activity = ({ comments, isLoadingMoreComments }: ActivityProps) => {
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
      {isLoadingMoreComments && <Spinner className="mt-4 self-center" />}
    </Dropdown>
  );
};
