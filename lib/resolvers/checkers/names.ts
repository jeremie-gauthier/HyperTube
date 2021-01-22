import { User } from "@/types/user";
import checkEmptyness from "./emptyness";

export const checkUsername = ({ username }: Pick<User, "username">) =>
  checkEmptyness("username", username);

export const checkFirstname = ({ firstname }: Pick<User, "firstname">) =>
  checkEmptyness("firstname", firstname);

export const checkLastname = ({ lastname }: Pick<User, "lastname">) =>
  checkEmptyness("lastname", lastname);
