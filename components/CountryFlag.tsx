import React from "react";
import UKFlag from "../public/icons/united-kingdom.svg";
import FRFlag from "../public/icons/france.svg";
import ESFlag from "../public/icons/spain.svg";
import JAFlag from "../public/icons/japan.svg";

type CountryFlagProps = {
  lang: string;
};

export default function CountryFlag({
  lang,
  ...rest
}: CountryFlagProps): JSX.Element | null {
  const isUK = lang === "en";
  const isFrance = lang === "fr";
  const isSpain = lang === "es";
  const isJapan = lang === "ja";

  if (isUK) return <UKFlag {...rest} />;
  if (isFrance) return <FRFlag {...rest} />;
  if (isSpain) return <ESFlag {...rest} />;
  if (isJapan) return <JAFlag {...rest} />;

  return null;
}
