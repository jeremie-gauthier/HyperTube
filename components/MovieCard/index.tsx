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
import { FlexCol, FlexRow } from "../Flex";

type MovieProps = {
  movie: ArchiveOrgMovieStandardized;
};

export default function MovieCard({ movie }: MovieProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const { data } = useExternalAPI<{ movieDetails: OMDBMovieStandardized }>({
    source: API.OMDB,
    title: movie.title,
    year: movie.year,
  });
  const movieDetails = data?.movieDetails;

  return movieDetails ? (
    <div className={styles.container} ref={hoverRef}>
      <img src={movieDetails.picture} alt="Movie poster" />
      <h2>{movie.title}</h2>
      {isHovered && <MovieDetails movie={movie} movieDetails={movieDetails} />}
    </div>
  ) : null;
}

type MovieDetailsProps = MovieProps & {
  movieDetails: OMDBMovieStandardized;
};

const MovieDetails = ({
  movie: { year, nbDownloads },
  movieDetails: { runtime, category },
}: MovieDetailsProps) => (
  <FlexCol className={styles.detailsContainer}>
    <FlexRow className={styles.commands}>
      <FlexRow className="space-x-5">
        <PlayIcon
          className="fill-current bg-white"
          role="button"
          onClick={() => console.log("Play")}
        />
        <CommentIcon />
        <AddIcon />
      </FlexRow>

      <FlexRow>
        <MovieIcon />
      </FlexRow>
    </FlexRow>
    <FlexRow className={styles.details}>
      <p>{runtime}</p>
      <p>{year}</p>
    </FlexRow>
    <FlexRow className={styles.details}>
      <p className={styles.truncate}>{category}</p>
      <p>{nbDownloads}</p>
    </FlexRow>
  </FlexCol>
);
