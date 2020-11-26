import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import userMock from "@/tests/__mocks__/user"; // MOCK
import { getInitials } from "@/lib/helpers";
import useHover from "@react-hook/hover";
import { langs } from "@/locales/i18n";
import CountryFlag from "@/components/CountryFlag";
import Magnifier from "../public/icons/magnifier.svg";
import styles from "./Navbar.module.scss";

export default function Navbar(): JSX.Element {
  return (
    <FlexRow className={styles.container}>
      <BrandLogo />
      <FlexRow className={styles.navlinks}>
        <Navigation />
      </FlexRow>
      <FlexRow className={styles.settings}>
        <UserMenu />
        <LangFlag />
      </FlexRow>
    </FlexRow>
  );
}

const BrandLogo = () => (
  <Image
    src="/icons/hypertube.png"
    alt="Hypertube logo"
    height={31}
    width={115}
    priority
  />
);

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/">{t("components.navbar.home")}</Link>
      <Link href="/movies/favorites">{t("components.navbar.my_list")}</Link>
      <SearchInput />
    </>
  );
};

const SearchInput = () => {
  const { t } = useTranslation();
  // I should probably use a context here for input

  return (
    <FlexRow className={styles.searchInput}>
      <Magnifier />
      <input placeholder={t("components.navbar.search")} />
    </FlexRow>
  );
};

const UserMenu = () => {
  const { t } = useTranslation();
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, {
    enterDelay: 0,
    leaveDelay: 500,
  });

  return (
    <div ref={hoverableNode} className={"bg-red " + styles.frame}>
      <span>{getInitials(userMock)}</span>

      {isHovering && (
        <div className="absolute z-40 top-12 right-0">
          <div className={styles.arrow} />
          <FlexCol className={styles.floater}>
            <Link href="account">{t("components.navbar.account")}</Link>
            <Link href="logout">{t("components.navbar.logout")}</Link>
          </FlexCol>
        </div>
      )}
    </div>
  );
};

const LangFlag = () => {
  const { t, i18n } = useTranslation();
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, {
    enterDelay: 0,
    leaveDelay: 500,
  });

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div ref={hoverableNode} className={styles.frame} data-testid="lang-flag">
      <CountryFlag
        lang={i18n.language}
        width={32}
        height={32}
        className="rounded"
      />

      {isHovering && (
        <div className="absolute z-40 top-12 right-0">
          <div className={styles.arrow} />
          <FlexCol className={styles.floater}>
            {langs.map((lang) => (
              <button
                key={`lang-${lang.value}`}
                type="button"
                onClick={() => changeLanguage(lang.value)}
                className="flex flex-row items-center space-x-2"
              >
                <CountryFlag lang={lang.value} width={15} height={15} />
                <span>{t(lang.key)}</span>
              </button>
            ))}
          </FlexCol>
        </div>
      )}
    </div>
  );
};
