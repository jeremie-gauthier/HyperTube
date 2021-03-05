import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockComments from "@/tests/__mocks__/comments";
import { Methods } from "@/types/requests";
import mockMovies from "@/tests/__mocks__/movies";
import mockUser from "@/tests/__mocks__/user";

const MOCK_USER = mockUser;
const MOCK_COMMENTS = mockComments;
const MOCK_MOVIES = mockMovies;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getUserCommentsOnMovie(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

async function getUserCommentsOnMovie(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id, range },
  } = req;

  logRequests(req);
  const [start, end] = (range as string).split(":").map((v) => parseInt(v, 10));
  const [user, comments] = await Promise.all([
    MOCK_USER.find((user) => user.id === id),
    MOCK_COMMENTS.filter((comment) => comment.userId === id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(start, end),
  ]);
  const movies = comments.map((comment) =>
    MOCK_MOVIES.find((movie) => movie.id === comment.movieId),
  );

  const userCommentsOnMovies = comments.map((comment, idx) => ({
    user,
    comment,
    movie: movies[idx],
  }));

  return res.status(200).json(userCommentsOnMovies);
}
