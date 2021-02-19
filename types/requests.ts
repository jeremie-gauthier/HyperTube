import { responseInterface } from "swr";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export type BaseSWR<Data> = Pick<
  responseInterface<Data, Error>,
  "mutate" | "revalidate" | "error"
> & {
  isLoading: boolean;
  isError: string;
};
