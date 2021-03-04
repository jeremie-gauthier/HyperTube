import React from "react";
import useHover from "@react-hook/hover";
import { useTranslation } from "react-i18next";
import { langs, LANGUAGE, Languages } from "@/locales/i18n";
import useOnClickOutside from "use-onclickoutside";
import { FlexCol } from "@/components/Flex";
import useUser, { usePatchUser } from "@/hooks/api/useUser";
import JAFlag from "../../public/icons/japan.svg";
import ESFlag from "../../public/icons/spain.svg";
import FRFlag from "../../public/icons/france.svg";
import UKFlag from "../../public/icons/united-kingdom.svg";
import styles from "./CountryFlag.module.scss";

type CountryFlagProps = React.SVGProps<SVGSVGElement> & {
  lang: Languages;
};

export default function CountryFlag({ lang, ...rest }: CountryFlagProps) {
  switch (lang) {
    case LANGUAGE.EN:
      return <UKFlag {...rest} />;
    case LANGUAGE.ES:
      return <ESFlag {...rest} />;
    case LANGUAGE.FR:
      return <FRFlag {...rest} />;
    case LANGUAGE.JA:
      return <JAFlag {...rest} />;
    default:
      return null;
  }
}

export function LangSettings() {
  const { i18n } = useTranslation();
  const { data: user } = useUser("-42");

  React.useEffect(() => {
    i18n.changeLanguage(user?.language ?? LANGUAGE.EN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.language]);

  return (
    <>
      <LangClickable
        currentLang={user?.language ?? LANGUAGE.EN}
        className={styles.isTouchScreen}
      />
      <LangHoverable
        currentLang={user?.language ?? LANGUAGE.EN}
        className={styles.isNotTouchScreen}
      />
    </>
  );
}

type LangIconProps = {
  currentLang: Languages;
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
          <LangOptions currentLang={currentLang} />
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
          <LangOptions currentLang={currentLang} />
        </div>
      )}
    </div>
  );
};

const LangOptions = ({ currentLang }: { currentLang: Languages }) => {
  const { t } = useTranslation();
  const patchUser = usePatchUser("-42");

  const changeLanguage = (lang: Languages) => {
    if (lang !== currentLang) {
      patchUser({ language: lang });
    }
  };

  return (
    <FlexCol className={styles.floaterContent}>
      {Object.entries(langs).map(([langKey, langValue]) => (
        <button
          key={langKey}
          type="button"
          onClick={() => changeLanguage(langKey as Languages)}
        >
          <CountryFlag lang={langKey as Languages} width={15} height={15} />
          <span>{t(langValue)}</span>
        </button>
      ))}
    </FlexCol>
  );
};
