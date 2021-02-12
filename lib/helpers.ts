import { NextApiRequest } from "next";

export function requiredField(str: string): string {
  return `${str}*`;
}

export function logRequests(req: NextApiRequest) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[${req.method}] ${req.url}`);
  }
}
