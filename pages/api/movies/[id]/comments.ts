import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockComments from "@/tests/__mocks__/comments";
import mockUser from "@/tests/__mocks__/user";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import { shortDateFormat } from "@/lib/date";
import { Comment } from "@/types/comment";

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
      case Methods.POST:
        return postCommentForMovie(req, res);
      default:
        res.setHeader("Allow", [Methods.GET, Methods.POST]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function getCommentsForMovie(req: MovieRequest, res: NextApiResponse) {
  const {
    query: { id, range },
  } = req;

  logRequests(req);
  // fetch movie with id if exists in db
  // don't forget to send dates to shortDateFormat()
  const [start, end] = (range as string).split(":").map((v) => parseInt(v, 10));
  const comments = MOCK_COMMENTS.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  ).slice(start, end);
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

function postCommentForMovie(req: MovieRequest, res: NextApiResponse) {
  const { comment } = req.body;
  const { id: movieId } = req.query;
  const date = new Date();

  // get userId with its auth token and
  // register the following obj in db:
  /*
    { comment, movieId, userId, date: formatDate }
  */

  const createdComment: Comment = {
    id: Math.random().toString(),
    comment,
    movieId,
    userId: "-42",
    date: shortDateFormat(date),
  };
  return res.status(201).json(createdComment);
}
