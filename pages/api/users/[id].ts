import type { NextApiRequest, NextApiResponse } from "next";
import { logRequests } from "@/lib/helpers";
import mockUser from "@/tests/__mocks__/user";

const MOCK: Record<string, unknown> = mockUser;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        return getUser(req, res);
      case "PATCH":
        return patchUser(req, res);
      default:
        res.setHeader("Allow", ["GET", "PATCH"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("ERROR", error);
    return res.status(500).json({ message: "An error occured" });
  }
}

function getUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  logRequests(req);
  if (id === "-42") {
    return res.status(200).json(MOCK);
  }
  return res.status(404);
}

function patchUser(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
  } = req;

  logRequests(req);
  if (id === "-42") {
    Object.entries(JSON.parse(body)).forEach(([k, v]) => {
      MOCK[k] = v;
    });
    res.status(200).json(MOCK);
  }
  return res.status(404);
}
