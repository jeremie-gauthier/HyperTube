import { CommentsForMovie, UserCommentsOnMovies } from "@/types/comment";
import { User } from "@/types/user";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FlexRow } from "../Flex";
import styles from "./Comment.module.scss";

type CommentProps = {
  userCommentOnMovie: UserCommentsOnMovies;
};

const Comment = ({
  userCommentOnMovie: { user, comment, movie },
}: CommentProps) => (
  <div className={styles.container}>
    <Header title={movie.title} date={comment.date} />
    <p>
      <Author username={user.username} />
    </p>
    <UserComment comment={comment.comment} />
  </div>
);
export default Comment;

export const MovieComment = ({
  userComment: { user, comment },
}: {
  userComment: CommentsForMovie;
}) => (
  <div className={styles.container}>
    <Header title={<AuthorLink user={user} />} date={comment.date} />
    <UserComment comment={comment.comment} />
  </div>
);

const Author = ({ username }: { username: string }) => {
  const { t } = useTranslation();

  return (
    <>
      {username} {t("components.comment.wrote")}:
    </>
  );
};

const AuthorLink = ({ user }: { user: User }) => (
  <Link href={`/users/${user.id}`}>
    <a href={`/users/${user.id}`}>
      <Author username={user.username} />
    </a>
  </Link>
);

const Header = ({
  title,
  date,
}: {
  title: string | JSX.Element;
  date: string;
}) => (
  <FlexRow className={styles.header}>
    <h3>{title}</h3>
    <p>{date}</p>
  </FlexRow>
);

const UserComment = ({ comment }: { comment: string }) => <p>{comment}</p>;
