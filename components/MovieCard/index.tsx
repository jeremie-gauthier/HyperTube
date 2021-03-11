import { Movie } from "@/types/movie";
import useHover from "@/hooks/useHover";
import styles from "./MovieCard.module.scss";
import { ReactComponent as PlayIcon } from "../../public/icons/play.svg";
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg";
import { ReactComponent as AddIcon } from "../../public/icons/add.svg";
import { ReactComponent as MovieIcon } from "../../public/icons/movie.svg";

type MovieProps = {
  movie: Movie;
};

export default function MovieCard({
  movie: { title, runtime, date, category, picture },
}: MovieProps) {
  const [hoverRef, isHovered] = useHover();
  return (
    <div
      className={isHovered ? styles.hoverContainer : styles.container}
      ref={hoverRef}
    >
      <img src={picture} alt="Movie poster" />
      <h2>{title}</h2>
      {isHovered ? (
        <button className={styles.playButton} type="button">
          <PlayIcon />
        </button>
      ) : null}
      {isHovered ? (
        <button className={styles.commentButton} type="button">
          <CommentIcon />
        </button>
      ) : null}
      {isHovered ? (
        <button className={styles.addButton} type="button">
          <AddIcon />
        </button>
      ) : null}
      {isHovered ? (
        <button className={styles.movieButton} type="button">
          <MovieIcon />
        </button>
      ) : null}
      {isHovered ? (
        <p>
          {runtime} - {date} <br /> <br />
          {category}
        </p>
      ) : null}
    </div>
  );
}
