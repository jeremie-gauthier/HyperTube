import React from "react";
import useSelector from "@/hooks/useSelector";
import useHover from "@react-hook/hover";
import useDispatch from "@/hooks/useDispatch";
import { useTranslation } from "react-i18next";
import { setLang } from "@/state/users/actions";
import { langs } from "@/locales/i18n";
import useOnClickOutside from "use-onclickoutside";
import { FlexCol } from "@/components/Flex";
import JAFlag from "../../public/icons/japan.svg";
import ESFlag from "../../public/icons/spain.svg";
import FRFlag from "../../public/icons/france.svg";
import UKFlag from "../../public/icons/united-kingdom.svg";
import styles from "./CountryFlag.module.scss";

type CountryFlagProps = React.SVGProps<SVGSVGElement> & {
  lang: string;
};

export default function CountryFlag({ lang, ...rest }: CountryFlagProps) {
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

export function LangSettings() {
  const currentLang = useSelector((state) => state.user.lang) as string;

  return (
    <>
      <LangClickable
        currentLang={currentLang}
        className={styles.isTouchScreen}
      />
      <LangHoverable
        currentLang={currentLang}
        className={styles.isNotTouchScreen}
      />
    </>
  );
}

type LangIconProps = {
  currentLang: string;
  className: string;
};

const LangClickable = ({ currentLang, className }: LangIconProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      role="button"
      ref={ref}
      className={[styles.frame, className].join(" ")}
      data-testid="lang-flag-clickable"
      onClick={() => setIsOpen(true)}
      aria-hidden="true"
    >
      <CountryFlag lang={currentLang} className={styles.countryFlag} />

      {isOpen && (
        <div className={styles.floaterMobile}>
          <LangOptions />
        </div>
      )}
    </div>
  );
};

const LangHoverable = ({ currentLang, className }: LangIconProps) => {
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);

  return (
    <div
      ref={hoverableNode}
      className={[styles.frame, className].join(" ")}
      data-testid="lang-flag-hoverable"
    >
      <CountryFlag lang={currentLang} className={styles.countryFlag} />

      {isHovering && (
        <div className={styles.floaterDesktop}>
          <LangOptions />
        </div>
      )}
    </div>
  );
};

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
