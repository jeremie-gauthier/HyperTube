import { FormErrors } from "@/hooks/useForm";
import { RegisterForm } from "@/lib/types/register";
import { UserForm } from "@/types/user";
import {
  checkEmail,
  checkPassword,
  checkUsername,
  checkCmpPassword,
} from "./checkers";
import checkEmptyness from "./checkers/emptyness";

export default function loginResolver(
  values: RegisterForm,
): FormErrors<RegisterForm> {
  const checksRegister = [
    checkUsername,
    checkCmpPassword,
    checkPassword,
    checkEmail,
    checkLastname,
    checkFirstname,
  ];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<RegisterForm>;

  return errors;
}

function checkLastname({ lastname }: Pick<UserForm, "lastname">) {
  return checkEmptyness("lastname", lastname);
}

function checkFirstname({ firstname }: Pick<UserForm, "firstname">) {
  return checkEmptyness("firstname", firstname);
}
