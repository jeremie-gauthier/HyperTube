// eslint-disable-next-line import/prefer-default-export
export const shortDateFormat = (date: Date) =>
  `${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date
    .getMonth()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
