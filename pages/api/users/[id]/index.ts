import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockUser from "@/tests/__mocks__/user";
import { Methods } from "@/types/requests";

const MOCK = mockUser;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case Methods.GET:
        return getUser(req, res);
      default:
        res.setHeader("Allow", [Methods.GET]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

const findUser = (id: string) => MOCK.find((user) => user.id === id);

function getUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  logRequests(req);
  const user = findUser(id as string);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "User not found" });
}
