import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import userMock from "@/tests/__mocks__/user"; // MOCK
import { getInitials } from "@/lib/helpers";
import useHover from "@react-hook/hover";
import Magnifier from "../public/icons/magnifier.svg";
import styles from "./Navbar.module.scss";

export default function Navbar(): JSX.Element {
  return (
    <FlexRow className={styles.container} data-testid="navbar-div">
      <FlexRow className={styles.content}>
        <BrandLogo />
        <Navigation />
      </FlexRow>
      <FlexRow className="space-x-4">
        <UserMenu />
        <LangFlag />
      </FlexRow>
    </FlexRow>
  );
}

const BrandLogo = () => <h1>HYPERTUBE</h1>;

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link href="/">
        <a href="/" data-testid="link-home">
          {t("components.navbar.home")}
        </a>
      </Link>
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
      <input
        placeholder={t("components.navbar.search")}
        className="text-white placeholder-white placeholder-bold bg-black"
      />
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
    <div ref={hoverableNode} className={styles.frame}>
      <span>{getInitials(userMock)}</span>

      {isHovering && (
        <div className="absolute z-40 top-12 right-0">
          <div className={styles.arrow} />
          <FlexCol className={styles.floater}>
            <Link href="account">
              <a href="/account" data-testid="link-account">
                {t("components.navbar.account")}
              </a>
            </Link>
            <Link href="logout">
              <a href="/logout" data-testid="link-logout">
                {t("components.navbar.logout")}
              </a>
            </Link>
          </FlexCol>
        </div>
      )}
    </div>
  );
};

const LangFlag = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.frame} data-testid="lang-flag">
      <span>lg</span>
    </div>
  );
};
