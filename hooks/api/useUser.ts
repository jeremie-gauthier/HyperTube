import { ConfigInterface } from "swr";
import { User } from "@/types/user";
import { apiRoute } from "@/lib/helpers";
import useFetch from "./useFetch";

export const usersRoute = (id?: string) =>
  apiRoute(id ? `/users/${id}` : `/users`);

export default function useUser(id: string, config?: ConfigInterface) {
  return useFetch<User>(usersRoute(id), config);
}
