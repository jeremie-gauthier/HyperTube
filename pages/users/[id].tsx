import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { UserCommentsOnMovies } from "@/types/comment";
import { GetServerSideProps } from "next";
import { FlexRow } from "@/components/Flex";
import CountryFlag from "@/components/CountryFlag";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Comment from "@/components/Comment";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
import { useUserComments, commentsRoute } from "@/hooks/api/useComments";
import Spinner from "@/components/Spinner";
import { usersRoute } from "@/hooks/api/useUser";
import styles from "./user.module.scss";

type UserProfileProps = {
  user: User | null;
  userCommentsOnMovie: UserCommentsOnMovies[];
};

const FETCH_CHUNK_SIZE = 4;
function UserProfile({ user, userCommentsOnMovie }: UserProfileProps) {
  const { comments, isLoadingMoreComments, loadMoreComments } = useUserComments(
    FETCH_CHUNK_SIZE,
    {
      initialData: [userCommentsOnMovie],
    },
  );

  return user === null ? (
    <div>ERROR ON PAGE</div>
  ) : (
    <ScrollBar style={{ touchAction: "none" }} onYReachEnd={loadMoreComments}>
      <main className={styles.container}>
        <Header user={user} />
        <Informations user={user} />
        <Activity
          userCommentOnMovie={comments}
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
    const [user, userCommentsOnMovie] = await Promise.all([
      fetcher<User>(`${api}${usersRoute(id as string)}`, init),
      fetcher<Comment[]>(
        `${api}${usersRoute(id as string)}${commentsRoute({
          start: 0,
          end: FETCH_CHUNK_SIZE,
        })}`,
        init,
      ),
    ]);
    return { props: { user, userCommentsOnMovie } };
  } catch (error) {
    return { props: { user: null, userCommentsOnMovie: [] } };
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
        <p className={styles.firstname}>{firstname}</p>
        <p className={styles.lastname}>{lastname}</p>
      </Dropdown.Element>
    </Dropdown>
  );
};

type ActivityProps = {
  userCommentOnMovie: UserCommentsOnMovies[];
  isLoadingMoreComments: boolean;
};

const Activity = ({
  userCommentOnMovie,
  isLoadingMoreComments,
}: ActivityProps) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      initialState
      title={<h2>{t("pages.user.activites")}</h2>}
      className={`${styles.dropdown} pb-8`}
    >
      {userCommentOnMovie.map((comment) => (
        <Comment key={comment.comment.id} userCommentOnMovie={comment} />
      ))}
      {isLoadingMoreComments && <Spinner className="mt-4 self-center" />}
    </Dropdown>
  );
};
