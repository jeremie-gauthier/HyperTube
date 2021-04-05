import { FlexCol, FlexRow } from "@/components/Flex";
import SiteLayout from "@/components/Layouts/SiteLayout";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import { humanReadableNumber } from "@/lib/helpers";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";
import React from "react";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
import { ReactComponent as EyeIcon } from "../../../public/icons/eye.svg";
import styles from "./details.module.scss";

type DetailsProps = {
  movieDetails: Movie | null;
};

function Details({ movieDetails }: DetailsProps) {
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
      </main>
    </ScrollBar>
  ) : (
    <p>No informations found</p>
  );
}

Details.Layout = SiteLayout;
export default Details;

export async function getStaticPaths() {
  const categories = Object.values(MovieCategory).map((categ) => categ);

  const ArchiveOrg = new ArchiveOrgAPI();
  // will generate a static page for all Movie Id already known from Categories
  const identifiers = (
    await Promise.all(
      categories.map(async (category) => {
        const identifiers = await ArchiveOrg.getAllMoviesIdentifierFromCategory(
          allMovieCategories[category],
        );
        return identifiers;
      }),
    )
  ).flat();
  const paths = identifiers.map((id) => ({ params: { id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}) {
  try {
    const ArchiveOrg = new ArchiveOrgAPI();
    const movieDetails = await ArchiveOrg.getAllFromId(id);
    console.log(`[${id}] OK`);
    return { props: { movieDetails } };
  } catch (error) {
    console.log(`[${id}] NOT OK => ${error}`);
    return { props: { movieDetails: null } };
  }
}

const Title = ({ title }: { title: string }) => (
  <h1 className={styles.title}>{title}</h1>
);

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
