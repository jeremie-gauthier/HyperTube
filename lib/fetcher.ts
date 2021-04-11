import i18n from "@/locales/i18n";
import { Methods } from "@/types/requests";

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

export async function fetcherPOST<Data>(url: RequestInfo, body: Partial<Data>) {
  return fetcher<Data>(url, {
    method: Methods.POST,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
