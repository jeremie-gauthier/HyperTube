import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockComments from "@/tests/__mocks__/comments";
import mockUser from "@/tests/__mocks__/user";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";

const MOCK_USER = mockUser;
const MOCK_COMMENTS = mockComments;

type MovieRequest = NextApiRequest & {
  query: {
    id: string;
  };
};

export default async function movieCommentsHandler(
  req: MovieRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getCommentsForMovie(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function getCommentsForMovie(req: MovieRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  logRequests(req);
  const comments = MOCK_COMMENTS.filter((comment) => comment.movieId === "0");
  const users = comments.reduce((hm, comment) => {
    if (!hm[comment.userId]) {
      hm[comment.userId] = MOCK_USER.find((user) => user.id === comment.userId);
    }
    return hm;
  }, {} as Record<string, User | undefined>);

  const commentsForMovie = comments.map((comment) => ({
    comment,
    user: users[comment.userId],
  }));
  if (!commentsForMovie) {
    return res.status(404).json({ message: "Resource not found" });
  }
  return res.status(200).json(commentsForMovie);
}
