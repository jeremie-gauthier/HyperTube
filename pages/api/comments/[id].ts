import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import { Methods } from "@/types/requests";
import mockComment from "@/tests/__mocks__/comments";

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.DELETE:
        return deleteComment(req, res);
      default:
        res.setHeader("Allow", [Methods.DELETE]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  logRequests(req);
  const comment = mockComment.find((comment) => comment.id === id);
  console.log(comment);
  if (comment) {
    return res.status(204).json(null);
  }
  return res.status(404).json({ message: "Comment not found" });
}
