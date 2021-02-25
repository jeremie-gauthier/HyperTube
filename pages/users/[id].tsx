import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";
import { GetServerSideProps } from "next";

type UserProfileProps = {
  user: User | null;
  comments: Comment[];
};

function UserProfile({ user, comments }: UserProfileProps) {
  console.log(user, comments);

  return user === null ? <div>ERROR ON PAGE</div> : <div>{user.username}</div>;
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
