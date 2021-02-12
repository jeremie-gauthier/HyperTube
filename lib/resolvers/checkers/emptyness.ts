import isEmpty from "@ramda/isempty";

export default function checkEmptyness(key: string, value: string) {
  return isEmpty(value.trim()) ? { [key]: "common.forms.required" } : {};
}
