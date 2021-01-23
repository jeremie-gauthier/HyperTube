/* eslint-disable max-statements */
import type { NextApiRequest, NextApiResponse } from "next";
import mockUser from "@/tests/__mocks__/user";

const MOCK: Record<string, unknown> = mockUser;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    body,
    method,
  } = req;

  switch (method) {
    case "GET":
      if (id === "-42") {
        console.log(`[GET] /api/users/${id}`);
        res.status(200).json(MOCK);
      } else {
        // data from db
      }
      break;
    case "PATCH":
      if (id === "-42") {
        console.log(`[PATCH] /api/users/${id}`);
        try {
          Object.entries(JSON.parse(body)).forEach(([k, v]) => {
            MOCK[k] = v;
          });
          res.status(200).json(MOCK);
        } catch (error) {
          console.log("ERROR", error);
          res.status(500).end();
        }
      } else {
        // data from db
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
