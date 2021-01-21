import useSWR, { ConfigInterface, mutate } from "swr";
import fetcher from "@/lib/fetcher";
import { TUser } from "@/data/models/User";

type UserSWR = {
  user: TUser;
  isLoading: boolean;
  isError: boolean;
  mutation: (newUserValues: Partial<TUser>) => Promise<unknown>;
};

export default function useUser(id: number, config?: ConfigInterface): UserSWR {
  const URL = `/api/user/${id}`;
  const { data, error } = useSWR(URL, fetcher, config);

  const mutation = (newUserValues: Partial<TUser>) =>
    mutate(URL, { ...data, ...newUserValues }, false);

  return {
    user: data ?? ({} as TUser),
    isLoading: !error && !data,
    isError: error,
    mutation,
  };
}
