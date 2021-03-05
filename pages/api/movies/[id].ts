import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockMovies from "@/tests/__mocks__/movies";
import { Methods } from "@/types/requests";

const MOCK = mockMovies;

export default async function movieHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getMovie(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function getMovie(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  logRequests(req);
  const movie = MOCK.find((movie) => movie.id === id);
  if (!movie) {
    return res.status(404).json({ message: "Resource not found" });
  }
  return res.status(200).json(movie);
}
