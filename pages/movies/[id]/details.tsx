import React from "react";
import { MovieComment as UserComment } from "@/components/Comment";
import { FlexCol, FlexRow } from "@/components/Flex";
import SiteLayout from "@/components/Layouts/SiteLayout";
import { commentsRoute, useMovieComments } from "@/hooks/api/useComments";
import { moviesRoute } from "@/hooks/api/useMovie";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import fetcher from "@/lib/fetcher";
import { humanReadableNumber } from "@/lib/helpers";
import { CommentsForMovie, UserCommentsOnMovies } from "@/types/comment";
import { Movie } from "@/types/movie";
import { Methods } from "@/types/requests";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ScrollBar from "@/components/Scrollbar";
import Spinner from "@/components/Spinner";
import MovieCommentModal from "@/components/Modal/MovieCommentModal";
import isEmpty from "@ramda/isempty";
import PublicDomainTorrentsAPI from "@/lib/external-api/PublicDomainTorrents";
// eslint-disable-next-line max-len
import { ReactComponent as CommentIcon } from "../../../public/icons/comment.svg";
import { ReactComponent as EyeIcon } from "../../../public/icons/eye.svg";
import { ReactComponent as PlayIcon } from "../../../public/icons/play.svg";
import styles from "./details.module.scss";

type DetailsProps = {
  movieDetails: Movie | null;
  movieComments: CommentsForMovie[];
};

const FETCH_CHUNK_SIZE = 5;
function Details({ movieDetails, movieComments }: DetailsProps) {
  const [userComments, setUserComments] = React.useState<
    UserCommentsOnMovies[]
  >([]);
  const {
    comments: fetchedComments,
    isLoadingMoreComments,
    loadMoreComments,
  } = useMovieComments(FETCH_CHUNK_SIZE, {
    initialData: [movieComments],
  });
  const comments = [...userComments, ...fetchedComments];

  return movieDetails ? (
    <ScrollBar onYReachEnd={loadMoreComments}>
      <main className={styles.container}>
        <Title title={movieDetails?.title} />
        <Statistics
          year={movieDetails.year}
          rating={movieDetails.rating}
          runtime={movieDetails.runtime}
          nbDownloads={movieDetails.nbDownloads}
        />
        <p className={styles.synopsis}>{movieDetails.synopsis}</p>
        <FlexCol>
          <Production production={movieDetails.production} />
          <Actors actors={movieDetails.actors} />
          <Category category={movieDetails.category} />
        </FlexCol>
        <MovieComments
          comments={comments}
          isLoadingMoreComments={isLoadingMoreComments}
        />

        <ActionPlay movieDetails={movieDetails} />
        <ActionComment
          movieDetails={movieDetails}
          addComment={(comment: UserCommentsOnMovies) =>
            setUserComments((comments) => [comment, ...comments])
          }
        />
      </main>
    </ScrollBar>
  ) : (
    <p>No informations found</p>
  );
}

Details.Layout = SiteLayout;
export default Details;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const api = process.env.HYPERTUBE_API_URL;

  try {
    const externalAPI = Number(id)
      ? new PublicDomainTorrentsAPI()
      : new ArchiveOrgAPI();

    const [movieDetails, movieComments] = await Promise.all([
      externalAPI.getAllFromId(id) as Promise<Movie>,
      fetcher<CommentsForMovie[]>(
        `${api}${moviesRoute(id)}${commentsRoute({
          start: 0,
          end: FETCH_CHUNK_SIZE,
        })}`,
        {
          method: Methods.GET,
        },
      ),
    ]);
    console.log(`[${id}] OK`);
    return { props: { movieDetails, movieComments } };
  } catch (error) {
    console.log(`[${id}] NOT OK => ${error}`);
    return { props: { movieDetails: null, movieComments: [] } };
  }
};

const Title = ({ title }: { title: string }) => (
  <h1 className={styles.title}>{title}</h1>
);

const ActionPlay = ({ movieDetails }: { movieDetails: Movie }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.playMovie}>
      <Link href={`/movies/${movieDetails.id}/streaming`}>
        <a href={`/movies/${movieDetails.id}/streaming`}>
          <PlayIcon role="button" onClick={() => console.log("Play")} />
          <p className={styles.hoverText}>{t("pages.movies.details.watch")}</p>
        </a>
      </Link>
    </div>
  );
};

const ActionComment = ({
  movieDetails,
  addComment,
}: {
  movieDetails: Movie;
  addComment: (comment: UserCommentsOnMovies) => void;
}) => {
  const { t } = useTranslation();
  const [commentMode, setCommentMode] = React.useState(false);
  const close = React.useCallback(() => setCommentMode(false), []);

  return (
    <div className={styles.commentMovie}>
      <button type="button" onClick={() => setCommentMode(true)}>
        <CommentIcon />
        <p className={styles.hoverText}>
          {t("pages.movies.details.add_comment")}
        </p>
      </button>

      {commentMode && (
        <MovieCommentModal
          movie={movieDetails}
          close={close}
          addComment={addComment}
        />
      )}
    </div>
  );
};

const Statistics = ({
  year,
  rating,
  runtime,
  nbDownloads,
}: {
  year: string | null | undefined;
  rating: string | null | undefined;
  runtime: string | null | undefined;
  nbDownloads: number | null | undefined;
}) => (
  <FlexRow className={styles.statistics}>
    <FlexRow>
      <p>{year}</p>
      <p>{rating}</p>
      <p>{runtime}</p>
    </FlexRow>
    {nbDownloads && (
      <FlexRow>
        <p>{humanReadableNumber(nbDownloads)}</p>
        <EyeIcon />
      </FlexRow>
    )}
  </FlexRow>
);

type MovieInformationFieldProps = {
  legend: string;
  information: string | null | undefined;
};

const MovieInformationField = ({
  legend,
  information,
}: MovieInformationFieldProps) => {
  const { t } = useTranslation();

  return (
    <FlexRow className={styles.information}>
      <h2>{t(legend)}</h2>
      <p>{information ?? t("pages.movies.details.unknown_information")}</p>
    </FlexRow>
  );
};

const Production = ({
  production,
}: {
  production: string | null | undefined;
}) => (
  <MovieInformationField
    legend="pages.movies.details.production"
    information={production}
  />
);

const Actors = ({ actors }: { actors: string | null | undefined }) => (
  <MovieInformationField
    legend="pages.movies.details.actors"
    information={actors}
  />
);

const Category = ({ category }: { category: string | null | undefined }) => (
  <MovieInformationField
    legend="pages.movies.details.category"
    information={category}
  />
);

const MovieComments = ({
  comments,
  isLoadingMoreComments,
}: {
  comments: CommentsForMovie[];
  isLoadingMoreComments: boolean;
}) => {
  const { t } = useTranslation();
  const hasSomeComments = !isEmpty(comments);

  return (
    <FlexCol className={styles.comments}>
      <h2>{t("pages.movies.details.comments")}</h2>
      {hasSomeComments ? (
        comments.map((comment, idx) => (
          <UserComment
            // eslint-disable-next-line react/no-array-index-key
            key={`${comment.comment.id}-${idx}`}
            userComment={comment}
          />
        ))
      ) : (
        <p className={styles.noComment}>
          {t("pages.movies.details.no_comment")}
        </p>
      )}
      {isLoadingMoreComments && <Spinner className="mt-4 self-center" />}
    </FlexCol>
  );
};
