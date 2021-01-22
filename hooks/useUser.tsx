import useSWR, { ConfigInterface, mutate } from "swr";
import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";

type UserSWR = {
  user: User;
  isLoading: boolean;
  isError: boolean;
  mutation: (newUserValues: Partial<User>) => Promise<unknown>;
};

export default function useUser(id: number, config?: ConfigInterface): UserSWR {
  const URL = `/api/users/${id}`;
  const { data, error } = useSWR(URL, fetcher, config);

  const mutation = (newUserValues: Partial<User>) =>
    mutate(URL, { ...data, ...newUserValues }, false);

  return {
    user: data ?? ({} as User),
    isLoading: !error && !data,
    isError: error,
    mutation,
  };
}
