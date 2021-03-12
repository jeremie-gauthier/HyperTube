import {
  ArchiveOrgMovieStandardized,
  OMDBMovieStandardized,
} from "@/types/movie";
import useHover from "@/hooks/useHover";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import { API } from "@/types/requests";
import styles from "./MovieCard.module.scss";
import { ReactComponent as PlayIcon } from "../../public/icons/play.svg";
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg";
import { ReactComponent as AddIcon } from "../../public/icons/add.svg";
import { ReactComponent as MovieIcon } from "../../public/icons/movie.svg";

type MovieProps = {
  movie: ArchiveOrgMovieStandardized;
};

export default function MovieCard({
  movie: { title, year, nbDownloads },
}: MovieProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { data } = useExternalAPI<{ movieDetails: OMDBMovieStandardized }>({
    source: API.OMDB,
    title,
    year,
  });
  const movieDetails = data?.movieDetails;

  return movieDetails ? (
    <div
      className={isHovered ? styles.hoverContainer : styles.container}
      ref={hoverRef}
    >
      <img src={movieDetails.picture} alt="Movie poster" />
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
          {movieDetails.runtime} - {year} <br /> <br />
          {movieDetails.category} - {nbDownloads}
        </p>
      ) : null}
    </div>
  ) : null;
}
