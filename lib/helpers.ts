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

export function tryCatchSync<Data, Failure>(
  tryFn: () => Data,
  catchFn: (error: Error) => Failure,
) {
  try {
    const response = tryFn();
    return response;
  } catch (error) {
    return catchFn(error);
  }
}

const revStr = (str: string) => str.split("").reverse().join("");

export const humanReadableNumber = (number: number) => {
  const numberStr = number.toString();
  const revNb = revStr(numberStr);
  const readable = revNb?.match(/\d{1,3}/g);
  return readable ? revStr(readable.join(" ")) : number;
};

export const omdbValueOrDefault = (
  value?: string | null,
  defaultValue?: string,
) => (value === OMDB_NULL_VALUE || !value ? defaultValue ?? "" : value);

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const promiseTimeout = <Data>(
  promise: () => Promise<Data>,
  ms: number,
) =>
  Promise.race([
    promise(),
    new Promise<Data>((_, reject) => sleep(ms).then(reject)),
  ]);

// retry an async action until it succeed or at most `retries` times
// with an optional delay (in ms) between every retry
export const promiseRetry = async <Data>(
  promise: () => Promise<Data>,
  retries: number,
  delay = 0,
) => {
  for (let retry = 0; retry < retries; retry++) {
    // eslint-disable-next-line no-await-in-loop
    const response = await tryCatch<Data, null>(
      () => promiseTimeout<Data>(promise, 5000),
      () => null,
    );
    if (response !== null) {
      return response;
    }
    if (delay > 0) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay);
    }
  }
  return null;
};
