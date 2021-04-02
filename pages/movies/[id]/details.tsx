import SiteLayout from "@/components/Layouts/SiteLayout";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import { allMovieCategories, Movie, MovieCategory } from "@/types/movie";

type DetailsProps = {
  movieDetails: Movie | null;
};

function Details({ movieDetails }: DetailsProps) {
  console.log(movieDetails);
  return <div>Hello from Details</div>;
}

Details.Layout = SiteLayout;
export default Details;

export async function getStaticPaths() {
  const categories = Object.values(MovieCategory).map((categ) => categ);

  const ArchiveOrg = new ArchiveOrgAPI();
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
    console.log(">>> ", id);
    const ArchiveOrg = new ArchiveOrgAPI();
    const movieDetails = await ArchiveOrg.getAllFromId(id);
    console.log(`[${id}] OK`);
    return { props: { movieDetails } };
  } catch (error) {
    console.log(`[${id}] NOT OK => ${error}`);
    return { props: { movieDetails: null } };
  }
}
