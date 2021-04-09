import i18n from "@/locales/i18n";

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

export default async function fetcher<Data>(
  url: RequestInfo,
  init?: RequestInit,
): Promise<Data> {
  const res = await fetch(url, init);

  if (!res.ok) {
    const errInfo = await res.json();
    const errStatus = res.status;
    throw new FetchError(
      i18n.t("common.errors.error_occured"),
      errInfo,
      errStatus,
    );
  }
  return res.status === 204 ? {} : res.json();
}
