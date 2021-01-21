import type { NextApiRequest, NextApiResponse } from "next";
import mockUser from "@/tests/__mocks__/user";
import { TUser } from "@/data/models/User";

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<TUser>,
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      if (id === "-42") {
        res.status(200).json(mockUser);
      } else {
        // data from db
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
