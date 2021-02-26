import { Comment as CommentType } from "@/types/comment";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types/movie";
import useUser from "@/hooks/useUser";
import { useTranslation } from "react-i18next";
import { FlexRow } from "../Flex";
import styles from "./Comment.module.scss";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const { t } = useTranslation();
  const { data: movie } = useSWR<Movie>(
    `/api/movies/${comment.movieId}`,
    fetcher,
  );
  const { user } = useUser(parseInt(comment.userId, 10));

  return movie ? (
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
  ) : null;
}
