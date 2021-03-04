import React from "react";
import useHover from "@react-hook/hover";
import { useTranslation } from "react-i18next";
import { mutate } from "swr";
import { langs, LANGUAGE, Languages } from "@/locales/i18n";
import useOnClickOutside from "use-onclickoutside";
import { FlexCol } from "@/components/Flex";
import fetcher from "@/lib/fetcher";
import { Methods } from "@/types/requests";
import { User } from "@/types/user";
import useUser, { usersRoute } from "@/hooks/api/useUser";
import JAFlag from "../../public/icons/japan.svg";
import ESFlag from "../../public/icons/spain.svg";
import FRFlag from "../../public/icons/france.svg";
import UKFlag from "../../public/icons/united-kingdom.svg";
import styles from "./CountryFlag.module.scss";
import { toastError } from "../Toast";

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
  const { data: user } = useUser("-42");

  return (
    <>
      <LangClickable
        currentLang={user?.language ?? "en"}
        className={styles.isTouchScreen}
      />
      <LangHoverable
        currentLang={user?.language ?? "en"}
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
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: Languages) => {
    i18n.changeLanguage(lang);
    mutate(
      usersRoute("-42"),
      async (currentUser: User) => {
        try {
          const newUser = await fetcher(usersRoute("-42"), {
            method: Methods.PATCH,
            body: JSON.stringify({ language: lang }),
          });
          return newUser;
        } catch (error) {
          toastError(error.info?.message);
          return currentUser;
        }
      },
      false,
    );
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
