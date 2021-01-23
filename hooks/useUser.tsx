import useSWR, { ConfigInterface } from "swr";
import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";

type UserSWR = {
  user: User;
  isLoading: boolean;
  isError: string;
  mutate: (
    data?: Partial<User>,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<unknown>;
};

export default function useUser(id: number, config?: ConfigInterface): UserSWR {
  const { data, error, mutate } = useSWR(`/api/users/${id}`, fetcher, config);

  return {
    user: data ?? ({} as User),
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
