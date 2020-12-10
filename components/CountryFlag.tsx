import React from "react";
import useSelector from "@/hooks/useSelector";
import useHover from "@react-hook/hover";
import useDispatch from "@/hooks/useDispatch";
import { useTranslation } from "react-i18next";
import { setLang } from "@/state/users/actions";
import { langs } from "@/locales/i18n";
import JAFlag from "../public/icons/japan.svg";
import ESFlag from "../public/icons/spain.svg";
import FRFlag from "../public/icons/france.svg";
import UKFlag from "../public/icons/united-kingdom.svg";
import { FlexCol } from "./Flex";
import styles from "./CountryFlag.module.scss";

type CountryFlagProps = React.SVGProps<SVGSVGElement> & {
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

export function LangSettings(): JSX.Element {
  const currentLang = useSelector((state) => state.user.lang) as string;
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);

  return (
    <div ref={hoverableNode} className={styles.frame} data-testid="lang-flag">
      <CountryFlag lang={currentLang} className={styles.countryFlag} />

      {isHovering && (
        <div className={styles.floater}>
          <LangOptions />
        </div>
      )}
    </div>
  );
}

const LangOptions = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLang(lang));
  };

  return (
    <FlexCol className={styles.floaterContent}>
      {Object.entries(langs).map(([langKey, langValue]) => (
        <button
          key={langKey}
          type="button"
          onClick={() => changeLanguage(langKey)}
        >
          <CountryFlag lang={langKey} width={15} height={15} />
          <span>{t(langValue)}</span>
        </button>
      ))}
    </FlexCol>
  );
};
