import { ConfigInterface } from "swr";
import { User } from "@/types/user";
import { apiRoute } from "@/lib/helpers";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { toastError } from "@/components/Toast";
import useFetch from "./useFetch";

export const usersRoute = (id?: string) =>
  apiRoute(id ? `/users/${id}` : `/users`);

export default function useUser(id: string, config?: ConfigInterface) {
  return useFetch<User>(usersRoute(id), config);
}

export const usePatchUser = (id: string) => {
  const { data: user, mutate, revalidate } = useUser(id);

  return async (newValues: Partial<User>) => {
    try {
      mutate({ ...user, ...newValues } as User);
      const newUser = await fetcher<User>(usersRoute(id), {
        method: Methods.PATCH,
        body: JSON.stringify(newValues),
      });
      revalidate();
      return newUser;
    } catch (error) {
      toastError(error.info?.message);
      return user;
    }
  };
};