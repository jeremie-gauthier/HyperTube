import { TUser } from "@/data/models/User";

// eslint-disable-next-line import/prefer-default-export
export function getInitials(user: TUser): string {
  return user.firstname.slice(0, 1) + user.lastname.slice(0, 1);
}
