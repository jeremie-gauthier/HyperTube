import { Comment as CommentType } from "@/types/comment";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types/movie";
import { useTranslation } from "react-i18next";
import useUser from "@/hooks/api/useUser";
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
  const { data: user } = useUser(comment.userId);

  return movie && user ? (
    <div className={styles.container}>
      <FlexRow className={styles.header}>
        <h3>{movie.title}</h3>
        <p>{comment.date}</p>
      </FlexRow>
      <p>
        {user?.username} {t("components.comment.wrote")}:
      </p>
      <p>{comment.comment}</p>
    </div>
  ) : null;
}
