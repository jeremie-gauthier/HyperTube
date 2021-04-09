import { Movie, POSTER_DEFAULT } from "@/types/movie";
import useHover from "@/hooks/useHover";
import { humanReadableNumber, omdbValueOrDefault } from "@/lib/helpers";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import styles from "./MovieCard.module.scss";
import { ReactComponent as PlayIcon } from "../../public/icons/play.svg";
import { ReactComponent as CommentIcon } from "../../public/icons/comment.svg";
import { ReactComponent as AddIcon } from "../../public/icons/add.svg";
import { ReactComponent as MovieIcon } from "../../public/icons/movie.svg";
import { ReactComponent as EyeIcon } from "../../public/icons/eye.svg";
import { FlexCol, FlexRow } from "../Flex";

const pictureFromArchiveOrg = (pictureDomain: string) =>
  pictureDomain?.match(/ia\d*.us.archive.org/) !== null;

type MovieProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieProps) {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className={styles.container} ref={hoverRef}>
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
      {isHovered && <MovieDetails movie={movie} />}
    </div>
  );
}

const MovieDetails = ({
  movie: { runtime, year, nbDownloads, category, archiveOrgIdentifier },
}: MovieProps) => (
  <FlexCol className={styles.detailsContainer}>
    <FlexRow className={styles.commands}>
      <CommandBtns movieId={archiveOrgIdentifier ?? ""} />
    </FlexRow>

    <FlexRow className={styles.details}>
      <p>{runtime}</p>
      <p>{year}</p>
    </FlexRow>
    <FlexRow className={styles.details}>
      <p className={styles.truncate}>
        {omdbValueOrDefault(category, "No category")}
      </p>
      <FlexRow className="items-center space-x-1">
        <p>{humanReadableNumber(nbDownloads)}</p>
        <EyeIcon className="h-3 w-3" />
      </FlexRow>
    </FlexRow>
  </FlexCol>
);

const CommandBtns = ({ movieId }: { movieId: string }) => (
  <>
    <FlexRow className="space-x-5">
      <PlayBtn />
      <CommentBtn />
      <AddBtn />
    </FlexRow>

    <FlexRow>
      <MovieBtn movieId={movieId} />
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

const MovieBtn = ({ movieId }: { movieId: string }) => (
  <div className={styles.borderCircle}>
    <Link href={`/movies/${movieId}/details`}>
      <a href={`/movies/${movieId}/details`}>
        <MovieIcon />
      </a>
    </Link>
  </div>
);
