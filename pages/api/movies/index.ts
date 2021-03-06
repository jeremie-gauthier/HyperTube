import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockMovies from "@/tests/__mocks__/movies";
import { API, Methods } from "@/types/requests";
import fetcher from "@/lib/fetcher";

const MOCK = mockMovies;

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

const getMovieFromExternalAPI = async (url: string, res: NextApiResponse) => {
  try {
    const movies = await fetcher(url);
    console.log(movies);
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Resource not found" });
  }
};

const loginToYTS = async () => {
  const { YTS_USERNAME, YTS_PASSWORD } = process.env;
  const loginBody = {
    username: YTS_USERNAME,
    password: YTS_PASSWORD,
  };
  const API_KEY = await fetcher("https://yts.mx/api/v2/user_get_key.json", {
    method: Methods.POST,
    body: JSON.stringify(loginBody),
  });
  return API_KEY;
};

async function getMovies(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { source, search },
  } = req;

  logRequests(req);
  switch (source) {
    case API.YTS:
      console.log("LOGGING IN YTS");
      // eslint-disable-next-line no-case-declarations
      const API_KEY = await loginToYTS();
      console.log(API_KEY);
      return getMovieFromExternalAPI(
        `${API.YTS}?limit=1&query_term=${search}`,
        res,
      );
    case API.ARCHIVE_ORG:
      return getMovieFromExternalAPI(
        `${API.ARCHIVE_ORG}?q=title:"${search}"&fl[]=title&rows=10&page=1&output=json`,
        res,
      );
    default:
      // list of registered movies
      return res.status(200).json({ movies: [] });
  }
}
