class FetchError extends Error {
  info: Record<string, string>;

  status: number;

  constructor(message: string, info: Record<string, string>, status: number) {
    super(message);
    this.info = info;
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);

  if (!res.ok) {
    const errInfo = await res.json();
    const errStatus = res.status;
    throw new FetchError(
      "An error occured while fetching the data.",
      errInfo,
      errStatus,
    );
  }

  return res.json();
}
