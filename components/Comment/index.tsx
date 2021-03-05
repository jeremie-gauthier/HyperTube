import { UserCommentsOnMovies } from "@/types/comment";
import { useTranslation } from "react-i18next";
import { FlexRow } from "../Flex";
import styles from "./Comment.module.scss";

type CommentProps = {
  userCommentOnMovie: UserCommentsOnMovies;
};

export default function Comment({
  userCommentOnMovie: { user, comment, movie },
}: CommentProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <FlexRow className={styles.header}>
        <h3>{movie.title}</h3>
        <p>{comment.date}</p>
      </FlexRow>
      <p>
        {user.username} {t("components.comment.wrote")}:
      </p>
      <p>{comment.comment}</p>
    </div>
  );
}
