import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import userMock from "@/tests/__mocks__/user"; // MOCK
import { getInitials } from "@/lib/helpers";
import useHover from "@react-hook/hover";
import { langs } from "@/locales/i18n";
import CountryFlag from "@/components/CountryFlag";
import useSelector from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setLang } from "@/state/users/actions";
import styles from "./Navbar.module.scss";

export default function Settings(): JSX.Element {
  return (
    <FlexRow className={styles.settings}>
      <UserSettings />
      <LangSettings />
    </FlexRow>
  );
}

const UserSettings = () => {
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);

  return (
    <FlexCol ref={hoverableNode} className={`${styles.frame} bg-red`}>
      <span>{getInitials(userMock)}</span>

      {isHovering && (
        <div className={styles.floater}>
          <UserLinks />
        </div>
      )}
    </FlexCol>
  );
};

const UserLinks = () => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.floaterContent}>
      <Link href="account">{t("components.navbar.account")}</Link>
      <Link href="logout">{t("components.navbar.logout")}</Link>
    </FlexCol>
  );
};

const LangSettings = () => {
  const currentLang = useSelector((state) => state.user.lang) as string;
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);

  return (
    <div ref={hoverableNode} className={styles.frame} data-testid="lang-flag">
      <CountryFlag
        lang={currentLang}
        width={32}
        height={32}
        className="rounded"
      />

      {isHovering && (
        <div className={styles.floater}>
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
