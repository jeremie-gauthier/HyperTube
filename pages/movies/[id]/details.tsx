import { MovieComment as UserComment } from "@/components/Comment";
import { FlexCol, FlexRow } from "@/components/Flex";
import SiteLayout from "@/components/Layouts/SiteLayout";
import { moviesRoute } from "@/hooks/api/useMovie";
import useHover from "@/hooks/useHover";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import fetcher from "@/lib/fetcher";
import { humanReadableNumber } from "@/lib/helpers";
import { CommentsForMovie } from "@/types/comment";
import { Movie } from "@/types/movie";
import { Methods } from "@/types/requests";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
// eslint-disable-next-line max-len
import { ReactComponent as CommentIcon } from "../../../public/icons/comment.svg";
import { ReactComponent as EyeIcon } from "../../../public/icons/eye.svg";
import { ReactComponent as PlayIcon } from "../../../public/icons/play.svg";
import styles from "./details.module.scss";

type DetailsProps = {
  movieDetails: Movie | null;
  comments: CommentsForMovie[];
};

function Details({ movieDetails, comments }: DetailsProps) {
  return movieDetails ? (
    <ScrollBar>
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
        <MovieComments comments={comments} />

        <ActionPlay movieDetails={movieDetails} />
        <ActionComment movieDetails={movieDetails} />
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
    const ArchiveOrg = new ArchiveOrgAPI();
    // ADD GET COMMENTS FOR MOVIE
    const [movieDetails, comments] = await Promise.all([
      ArchiveOrg.getAllFromId(id),
      fetcher<CommentsForMovie[]>(`${api}${moviesRoute(id)}/comments`, {
        method: Methods.GET,
      }),
    ]);
    console.log(`[${id}] OK`);
    return { props: { movieDetails, comments } };
  } catch (error) {
    console.log(`[${id}] NOT OK => ${error}`);
    return { props: { movieDetails: null, comments: [] } };
  }
};

const Title = ({ title }: { title: string }) => (
  <h1 className={styles.title}>{title}</h1>
);

const ActionPlay = ({ movieDetails }: { movieDetails: Movie }) => {
  const { t } = useTranslation();
  const [hoverRef, isHovered] = useHover();

  return (
    <div className={styles.playMovie}>
      <Link href={`/movies/${movieDetails.archiveOrgIdentifier}/streaming`}>
        <a
          ref={hoverRef}
          href={`/movies/${movieDetails.archiveOrgIdentifier}/streaming`}
        >
          <PlayIcon role="button" onClick={() => console.log("Play")} />
          {isHovered && <p>{t("pages.movies.details.watch")}</p>}
        </a>
      </Link>
    </div>
  );
};

const ActionComment = ({ movieDetails }: { movieDetails: Movie }) => {
  const { t } = useTranslation();
  const [hoverRef, isHovered] = useHover();

  return (
    <div className={styles.commentMovie}>
      <button ref={hoverRef} type="button">
        <CommentIcon role="button" onClick={() => console.log("Comment")} />
        {isHovered && <p>{t("pages.movies.details.add_comment")}</p>}
      </button>
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

const MovieComments = ({ comments }: { comments: CommentsForMovie[] }) => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.comments}>
      <h2>{t("pages.movies.details.comments")}</h2>
      {comments.map((comment) => (
        <UserComment key={comment.comment.id} userComment={comment} />
      ))}
    </FlexCol>
  );
};
