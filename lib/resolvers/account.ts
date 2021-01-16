import { FormErrors } from "@/hooks/useForm";
import { AccountForm } from "@/lib/types/account";
import { TLangs } from "@/locales/i18n";
import isEmpty from "@ramda/isempty";
import { checkUsername } from "./checkers";

export default function accountResolver(
  values: AccountForm,
): FormErrors<AccountForm> {
  const checkPipeline = [
    checkUsername,
    checkLastname,
    checkFirstname,
    checkLanguage,
  ];

  const errors = checkPipeline.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<AccountForm>;

  return errors;
}

function checkLastname({ lastname }: { lastname: string }) {
  return isEmpty(lastname.trim()) ? { lastname: "common.forms.required" } : {};
}

function checkFirstname({ firstname }: { firstname: string }) {
  return isEmpty(firstname.trim())
    ? { firstname: "common.forms.required" }
    : {};
}

function checkLanguage({ language }: { language: TLangs }) {
  return ["en", "fr", "es", "ja"].some((lang) => lang === language)
    ? {}
    : { language: "common.forms.required" };
}
