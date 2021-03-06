/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import { API, Methods } from "@/types/requests";
import ArchiveOrgAPI from "@/lib/external-api/ArchiveOrg";

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
  switch (source) {
    case API.YTS:
      const moviesYTS = null;
      return res.status(200).json({ movies: moviesYTS });
    case API.ARCHIVE_ORG:
      const externalAPI = new ArchiveOrgAPI();
      const moviesArchiveOrg = await externalAPI.get(search as string);
      return res.status(200).json({ movies: moviesArchiveOrg });
    default:
      // list of registered movies
      return res.status(200).json({ movies: [] });
  }
}
