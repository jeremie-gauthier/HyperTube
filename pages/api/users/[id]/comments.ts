import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockComments from "@/tests/__mocks__/comments";
import { Methods } from "@/types/requests";

const MOCK = mockComments;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getUserComments(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function getUserComments(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id, range },
  } = req;

  logRequests(req);
  const [start, end] = (range as string).split(":").map((v) => parseInt(v, 10));
  const userComments = MOCK.filter((comment) => comment.userId === id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(start, end);
  return res.status(200).json(userComments);
}
