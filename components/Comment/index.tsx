import { Comment as CommentType } from "@/types/comment";
import styles from "./Comment.module.scss";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { Movie } from "@/types/movie";
import { FlexRow } from "../Flex";
import useUser from "@/hooks/useUser";

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const { data: movie, error } = useSWR<Movie>(
    `/api/movies/${comment.movieId}`,
    fetcher,
  );
  const { user } = useUser(parseInt(comment.userId));

  return (
    <div className={styles.container}>
      <FlexRow className={styles.header}>
        <h3>{movie?.title}</h3>
        <p>{comment.date}</p>
      </FlexRow>
      <p>{user.username} a écrit:</p>
      <p>{comment.comment}</p>
    </div>
  );
}
