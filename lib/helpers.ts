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
