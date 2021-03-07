/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import { API, Methods } from "@/types/requests";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";
import OMDB from "@/lib/external-api/OMDB";

export default async function movieHandler(
  req: NextApiRequest,
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

// const loginToYTS = async () => {
//   const { YTS_USERNAME, YTS_PASSWORD } = process.env;
//   const loginBody = {
//     username: YTS_USERNAME,
//     password: YTS_PASSWORD,
//   };
//   const API_KEY = await fetcher("https://yts.mx/api/v2/user_get_key.json", {
//     method: Methods.POST,
//     body: JSON.stringify(loginBody),
//   });
//   return API_KEY;
// };

async function getMovies(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { source, search },
  } = req;

  logRequests(req);
  if ((search as string).trim().length === 0) {
    return [];
  }

  switch (source) {
    case API.ARCHIVE_ORG:
      const ArchiveOrg = new ArchiveOrgAPI();
      const moviesArchiveOrg = await ArchiveOrg.get(search as string);
      return res.status(200).json({ movies: moviesArchiveOrg });
    case API.OMDB:
      const Omdb = new OMDB();
      const moviesOmdb = await Omdb.get(search as string);
      const moviesOmbFormat = moviesOmdb.map((movie: any) => ({
        title: movie.Title,
        date: movie.Year,
      }));
      return res.status(200).json({ movies: moviesOmbFormat });
    case API.YTS:
      const moviesYTS = null;
      return res.status(200).json({ movies: moviesYTS });
    default:
      // list of registered movies
      return res.status(200).json({ movies: [] });
  }
}
