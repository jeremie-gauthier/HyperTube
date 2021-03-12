/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import { API, Methods } from "@/types/requests";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import OMDB from "@/lib/external-api/OMDB";
import { OmdbMovieFound } from "@/types/movie";

type MovieRequest = NextApiRequest & {
  query: {
    source: string;
    search?: string;
    title?: string;
    year?: string;
  };
};

export default async function movieHandler(
  req: MovieRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getMovies(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

async function fetchMoviesFromExternalAPI(source: string, search: string) {
  switch (source) {
    case API.ARCHIVE_ORG:
      const ArchiveOrg = new ArchiveOrgAPI();
      const moviesArchiveOrg = await ArchiveOrg.get(search);
      return moviesArchiveOrg.map((movie) => ArchiveOrgAPI.standardize(movie));
    default:
      // list of registered movies
      return [];
  }
}

async function fetchMovieDetailsFromOMDB(title: string, year: string) {
  const omdbAPI = new OMDB();
  const response = await omdbAPI.getByTitleAndYear(title, year);
  if (OmdbMovieFound(response)) {
    return OMDB.standardize(response);
  }
  return null;
}

async function getMovies(req: MovieRequest, res: NextApiResponse) {
  const {
    query: { source, search, title, year },
  } = req;

  logRequests(req);

  // Search a list of movies whose title match `search`
  if (search) {
    const movies = await fetchMoviesFromExternalAPI(source, search);
    return res.status(200).json({ movies });
  }

  // Look for more details about an already fetched movie
  if (title && year) {
    const movieDetails = await fetchMovieDetailsFromOMDB(title, year);
    return res.status(200).json({ movieDetails });
  }

  return res.status(500).json({ message: "Bad request" });
}