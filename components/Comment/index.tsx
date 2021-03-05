import { Comment as CommentType } from "@/types/comment";
import { useTranslation } from "react-i18next";
import useUser from "@/hooks/api/useUser";
import useMovie from "@/hooks/api/useMovie";
import { FlexRow } from "../Flex";
import styles from "./Comment.module.scss";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const { t } = useTranslation();
  const { data: movie } = useMovie(comment.movieId);
  const { data: user } = useUser(comment.userId);

  return (
    <div className={styles.container}>
      <FlexRow className={styles.header}>
        <h3>{movie?.title}</h3>
        <p>{comment.date}</p>
      </FlexRow>
      <p>
        {user?.username} {t("components.comment.wrote")}:
      </p>
      <p>{comment.comment}</p>
    </div>
  );
}
