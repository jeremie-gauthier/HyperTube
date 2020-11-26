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
import ActiveLink from "@/components/ActiveLink";
import Magnifier from "../public/icons/magnifier.svg";
import styles from "./Navbar.module.scss";

export default function Navbar(): JSX.Element {
  return (
    <FlexRow className={styles.container}>
      <BrandLogo />

      <FlexRow className={styles.items}>
        <Navigation />
        <SearchInput />
      </FlexRow>

      <FlexRow className={styles.settings}>
        <UserMenu />
        <LangFlag />
      </FlexRow>
    </FlexRow>
  );
}

// The <a> markup is mandatory here to avoid errors
// https://github.com/vercel/next.js/issues/7915
const BrandLogo = () => (
  <Link href="/">
    <a href="/" className="flex">
      <Image
        src="/icons/hypertube.png"
        alt="Hypertube logo"
        height={31}
        width={115}
        priority
        className="cursor-pointer"
      />
    </a>
  </Link>
);

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <ActiveLink href="/">{t("components.navbar.home")}</ActiveLink>
      <ActiveLink href="/movies/favorites">
        {t("components.navbar.my_list")}
      </ActiveLink>
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
    <div ref={hoverableNode} className={styles.frame + " bg-red"}>
      <span>{getInitials(userMock)}</span>

      {isHovering && (
        <div className={styles.floater}>
          <div className={styles.arrow} />
          <FlexCol className={styles.floaterContent}>
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
        <div className={styles.floater}>
          <div className={styles.arrow} />
          <FlexCol className={styles.floaterContent}>
            {langs.map((lang) => (
              <button
                key={lang.value}
                type="button"
                onClick={() => changeLanguage(lang.value)}
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
