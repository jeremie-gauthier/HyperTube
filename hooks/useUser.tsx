import useSWR, { ConfigInterface } from "swr";
import fetcher from "@/lib/fetcher";
import { User } from "@/types/user";
import { BaseSWR } from "@/types/requests";

type UserSWR = BaseSWR<User> & {
  user: User;
};

export default function useUser(id: number, config?: ConfigInterface): UserSWR {
  const { data, error, isValidating, ...rest } = useSWR(
    `/api/users/${id}`,
    fetcher,
    config,
  );

  return {
    user: data ?? ({} as User),
    isLoading: isValidating,
    isError: error,
    ...rest,
  };
}
