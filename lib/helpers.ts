import { User } from "@/types/user";

export function getInitials(user: User): string {
  return user.firstname.slice(0, 1) + user.lastname.slice(0, 1);
}

export function requiredField(str: string): string {
  return `${str}*`;
}
