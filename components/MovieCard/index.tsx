import { Movie, POSTER_DEFAULT } from "@/types/movie";
import useHover from "@/hooks/useHover";
import { humanReadableNumber, omdbValueOrDefault } from "@/lib/helpers";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import classnames from "classnames";
import styles from "./MovieCard.module.scss";
import { ReactComponent as PlayIcon } from "../../public/icons/play.svg";
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg";
import { ReactComponent as AddIcon } from "../../public/icons/add.svg";
import { ReactComponent as MovieIcon } from "../../public/icons/movie.svg";
import { ReactComponent as EyeIcon } from "../../public/icons/eye.svg";
import { FlexCol, FlexRow } from "../Flex";
import MovieCommentModal from "../Modal/MovieCommentModal";

const pictureFromArchiveOrg = (pictureDomain: string) =>
  pictureDomain?.match(/ia\d*.us.archive.org/) !== null;

type MovieProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [commentMode, setCommentMode] = React.useState(false);
  const open = React.useCallback(() => setCommentMode(true), []);
  const close = React.useCallback(() => setCommentMode(false), []);
  const isCommentModalOpened = commentMode === true;
  const containerStyle = classnames({
    [styles.container]: true,
    [styles.containerHover]: isHovered && !isCommentModalOpened,
  });

  return (
    <>
      <div className={containerStyle} ref={hoverRef}>
        <div className={styles.poster}>
          {pictureFromArchiveOrg(movie.picture) ? (
            <object data={movie.picture}>
              <img src={POSTER_DEFAULT} alt="Movie poster" />
            </object>
          ) : (
            <Image
              layout="fill"
              src={omdbValueOrDefault(movie.picture, POSTER_DEFAULT)}
              alt="Movie poster"
            />
          )}
        </div>
        <h2>{movie.title}</h2>
        {isHovered && (
          <MovieDetails movie={movie} openMovieCommentModal={open} />
        )}
      </div>

      {commentMode && (
        <MovieCommentModal
          movie={movie}
          close={close}
          addComment={() => null}
        />
      )}
    </>
  );
}

const MovieDetails = ({
  movie,
  openMovieCommentModal,
}: MovieProps & { openMovieCommentModal: () => void }) => (
  <FlexCol className={styles.detailsContainer}>
    <FlexRow className={styles.commands}>
      <CommandBtns
        movie={movie}
        openMovieCommentModal={openMovieCommentModal}
      />
    </FlexRow>

    <FlexRow className={styles.details}>
      <p>{movie.runtime}</p>
      <p>{movie.year}</p>
    </FlexRow>
    <FlexRow className={styles.details}>
      <p className={styles.truncate}>
        {omdbValueOrDefault(movie.category, "No category")}
      </p>
      <FlexRow className="items-center space-x-1">
        {movie.nbDownloads && (
          <>
            <p>{humanReadableNumber(movie.nbDownloads)}</p>
            <EyeIcon className="h-3 w-3" />
          </>
        )}
      </FlexRow>
    </FlexRow>
  </FlexCol>
);

const CommandBtns = ({
  movie,
  openMovieCommentModal,
}: MovieProps & { openMovieCommentModal: () => void }) => (
  <>
    <FlexRow className="space-x-5">
      <PlayBtn />
      <CommentBtn openMovieCommentModal={openMovieCommentModal} />
      <AddBtn />
    </FlexRow>

    <FlexRow>
      <MovieBtn movieId={movie.id} />
    </FlexRow>
  </>
);

const PlayBtn = () => (
  <div className={styles.fullCircle}>
    <PlayIcon role="button" onClick={() => console.log("Play")} />
  </div>
);

const CommentBtn = ({
  openMovieCommentModal,
}: {
  openMovieCommentModal: () => void;
}) => (
  <button
    type="button"
    className={styles.borderCircle}
    onClick={openMovieCommentModal}
  >
    <CommentIcon />
  </button>
);

const AddBtn = () => (
  <button
    type="button"
    className={styles.borderCircle}
    onClick={() => console.log("Add to my list")}
  >
    <AddIcon />
  </button>
);

const MovieBtn = ({ movieId }: { movieId: string }) => (
  <div className={styles.borderCircle}>
    <Link href={`/movies/${movieId}/details`}>
      <a href={`/movies/${movieId}/details`}>
        <MovieIcon />
      </a>
    </Link>
  </div>
);
