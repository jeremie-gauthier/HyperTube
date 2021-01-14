import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { TUser } from "@/data/models/User";
import mockUser from "@/tests/__mocks__/user";

export default function useUser(id: number) {
  // const { data, error } = useSWR(`/api/user/${id}`, fetcher);
  const data = mockUser;
  const error = null;

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
