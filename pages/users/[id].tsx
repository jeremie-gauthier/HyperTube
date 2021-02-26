import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { Comment as CommentType } from "@/types/comment";
import { GetServerSideProps } from "next";
import ScrollBar from "react-perfect-scrollbar";
import { FlexRow } from "@/components/Flex";
import CountryFlag from "@/components/CountryFlag";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import Comment from "@/components/Comment";
import { useTranslation } from "react-i18next";
import styles from "./user.module.scss";

type UserProfileProps = {
  user: User | null;
  comments: CommentType[];
};

function UserProfile({ user, comments }: UserProfileProps) {
  return user === null ? (
    <div>ERROR ON PAGE</div>
  ) : (
    <main className={styles.container}>
      <ScrollBar className={styles.scrollContainer}>
        <Header user={user} />
        <Informations user={user} />
        <Activity comments={comments} />
      </ScrollBar>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.HYPERTUBE_API_URL;
  const { id } = context.query;

  try {
    const init = { method: Methods.GET };
    const [user, comments] = await Promise.all([
      fetcher(`${api}/users/${id}`, init),
      fetcher(`${api}/users/${id}/comments`, init),
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
      title={<h2>{t("pages.user.informations").toUpperCase()}</h2>}
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
      title={<h2>{t("pages.user.activites").toUpperCase()}</h2>}
      className={styles.dropdown}
    >
      <p>{t("pages.user.last_comments")}</p>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Dropdown>
  );
};
