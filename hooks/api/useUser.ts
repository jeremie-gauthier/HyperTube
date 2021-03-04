import { ConfigInterface } from "swr";
import { User } from "@/types/user";
import useFetch from "./useFetch";

export const usersRoute = (id?: string) => (id ? `/users/${id}` : `/users`);

export default function useUser(id: string, config?: ConfigInterface) {
  return useFetch<User>(usersRoute(id), config);
}
