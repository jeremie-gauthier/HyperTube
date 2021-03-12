import { OMDB_NULL_VALUE } from "@/types/movie";
import { NextApiRequest } from "next";

export function requiredField(str: string): string {
  return `${str}*`;
}

export function logRequests(req: NextApiRequest) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[${req.method}] ${req.url}`);
  }
}

export const apiRoute = (url: string) => `/api${url}`;

export async function tryCatch<Data, Failure>(
  asyncTryFn: () => Promise<Data>,
  catchFn: (error: Error) => Failure,
) {
  try {
    const response = await asyncTryFn();
    return response;
  } catch (error) {
    return catchFn(error);
  }
}

const revStr = (str: string) => str.split("").reverse().join("");

export const humanReadableNumber = (number: number) => {
  const numberStr = number.toString();
  const revNb = revStr(numberStr);
  const readable = revNb.match(/\d{1,3}/g);
  return readable ? revStr(readable.join(" ")) : number;
};

export const omdbValueOrDefault = (value: string, defaultValue?: string) =>
  value === OMDB_NULL_VALUE ? defaultValue ?? "" : value;
