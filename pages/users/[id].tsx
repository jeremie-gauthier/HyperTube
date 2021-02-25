import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";
import { GetServerSideProps } from "next";
import ScrollBar from "react-perfect-scrollbar";
import styles from "./user.module.scss";

type UserProfileProps = {
  user: User | null;
  comments: Comment[];
};

function UserProfile({ user, comments }: UserProfileProps) {
  console.log(user, comments);

  return user === null ? (
    <div>ERROR ON PAGE</div>
  ) : (
    <main>
      <ScrollBar className={styles.scrollContainer}>
        <Header />
        <Informations />
        <Activity />
      </ScrollBar>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = process.env.HYPERTUBE_API_URL;
  const { id } = context.query;

  try {
    const user = await fetcher(`${api}/users/${id}`, {
      method: Methods.GET,
    });
    const comments = await fetcher(`${api}/users/${id}/comments`, {
      method: Methods.GET,
    });
    return { props: { user, comments } };
  } catch (error) {
    return { props: { user: null, comments: [] } };
  }
};

UserProfile.Layout = SiteLayout;
export default UserProfile;

const Header = ({ user: { username, picture, language } }: { user: User }) => (
  <div />
);

const Informations = ({ user: { firstname, lastname } }: { user: User }) => (
  <div />
);

const Activity = ({ comments }: { comments: Comment[] }) => <div />;
