import { UserForm } from "@/types/user";

export default function cmpPassword({
  password,
  cpassword,
}: Pick<UserForm, "password" | "cpassword">) {
  return password === cpassword
    ? {}
    : {
        password: "common.forms.diff_pwd",
        cpassword: "common.forms.diff_pwd",
      };
}
