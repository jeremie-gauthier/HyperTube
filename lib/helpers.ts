import { TUser } from "@/data/models/User";

export function getInitials(user: TUser): string {
  return user.firstname.slice(0, 1) + user.lastname.slice(0, 1);
}

export function requiredField(str: string): string {
  return `${str}*`;
}
