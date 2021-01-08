export default function checkUsername({ username }: { username: string }) {
  return username.trim().length === 0
    ? { username: "common.forms.required" }
    : {};
}
