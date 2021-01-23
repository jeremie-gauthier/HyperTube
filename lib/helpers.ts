import { User } from "@/types/user";
import { NextApiRequest } from "next";

export function getInitials(user: User): string {
  return user.firstname.slice(0, 1) + user.lastname.slice(0, 1);
}

export function requiredField(str: string): string {
  return `${str}*`;
}

export function logRequests(req: NextApiRequest) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[${req.method}] ${req.url}`);
  }
}
