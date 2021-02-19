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
    query: { id },
  } = req;

  logRequests(req);
  const userComments = MOCK.filter(
    (comment) => comment.userId.toString() === id,
  );
  console.log(userComments);
  // return res.status(404).json({ message: "Resource not found" });
  return res.status(200).json(userComments);
}
