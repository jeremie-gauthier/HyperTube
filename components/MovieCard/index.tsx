import {
  ArchiveOrgMovieStandardized,
  OMDBMovieStandardized,
} from "@/types/movie";
import useHover from "@/hooks/useHover";
import useExternalAPI from "@/hooks/api/useExternalAPI";
import { API } from "@/types/requests";
import { humanReadableNumber } from "@/lib/helpers";
import styles from "./MovieCard.module.scss";
import { ReactComponent as PlayIcon } from "../../public/icons/play.svg";
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg";
import { ReactComponent as AddIcon } from "../../public/icons/add.svg";
import { ReactComponent as MovieIcon } from "../../public/icons/movie.svg";
import { ReactComponent as EyeIcon } from "../../public/icons/eye.svg";
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
      <CommandBtns />
    </FlexRow>

    <FlexRow className={styles.details}>
      <p>{runtime}</p>
      <p>{year}</p>
    </FlexRow>
    <FlexRow className={styles.details}>
      <p className={styles.truncate}>{category}</p>
      <FlexRow className="items-center space-x-1">
        <p>{humanReadableNumber(nbDownloads)}</p>
        <EyeIcon className="h-3 w-3" />
      </FlexRow>
    </FlexRow>
  </FlexCol>
);

const CommandBtns = () => (
  <>
    <FlexRow className="space-x-5">
      <PlayBtn />
      <CommentBtn />
      <AddBtn />
    </FlexRow>

    <FlexRow>
      <MovieBtn />
    </FlexRow>
  </>
);

const PlayBtn = () => (
  <div className={styles.fullCircle}>
    <PlayIcon role="button" onClick={() => console.log("Play")} />
  </div>
);

const CommentBtn = () => (
  <div className={styles.borderCircle}>
    <CommentIcon role="button" onClick={() => console.log("Comment")} />
  </div>
);

const AddBtn = () => (
  <div className={styles.borderCircle}>
    <AddIcon role="button" onClick={() => console.log("Comment")} />
  </div>
);

const MovieBtn = () => (
  <div className={styles.borderCircle}>
    <MovieIcon role="button" onClick={() => console.log("Comment")} />
  </div>
);
