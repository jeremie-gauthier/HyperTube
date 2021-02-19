import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { Comment } from "@/types/comment";

type UserProfileProps = {
  user: User | null;
  comments: Comment[];
};

function UserProfile({ user, comments }: UserProfileProps) {
  console.log(user, comments);

  return user === null ? <div>ERROR ON PAGE</div> : <div>{user.username}</div>;
}

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;
  try {
    const user = await fetcher(`${api}/users/${0}`, {
      method: Methods.GET,
    });
    const comments = await fetcher(`${api}/users/${0}/comments`, {
      method: Methods.GET,
    });
    return { props: { user, comments } };
  } catch (error) {
    return { props: { user: null, comments: [] } };
  }
}

UserProfile.Layout = SiteLayout;
export default UserProfile;
