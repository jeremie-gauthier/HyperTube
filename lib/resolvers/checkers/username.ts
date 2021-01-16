import isEmpty from "@ramda/isempty";

export default function checkUsername({ username }: { username: string }) {
  return isEmpty(username.trim()) ? { username: "common.forms.required" } : {};
}
