/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { FlexCol, FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import ActiveLink from "@/components/ActiveLink";
import { RootState } from "@/state/types";
import useSelector, { useResponsiveAttribute } from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setSearchInput } from "@/state/movies/actions";
import classNames from "classnames";
import userMock from "@/tests/__mocks__/user"; // MOCK
import UserIcon from "@/components/UserIcon";
import CountryFlag from "@/components/CountryFlag";
import Magnifier from "../../public/icons/magnifier.svg";
import Cross from "../../public/icons/cross.svg";
import MenuBurger from "../../public/icons/menu-burger.svg";
import styles from "./Navbar.module.scss";
import Settings from "./Settings";

export default function Navbar(): JSX.Element {
  const isTabletOrMobile = useResponsiveAttribute();

  return (
    <FlexRow className={styles.container}>
      <BrandLogo />

      {isTabletOrMobile ? <MobileView /> : <DesktopView />}
    </FlexRow>
  );
}

const MobileView = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FlexRow className={`relative ${styles.items} justify-end`}>
        <SearchInput />
        {open ? (
          <Cross
            className="h-5 w-5"
            onClick={() => setOpen(false)}
            data-testid="cross-icon"
          />
        ) : (
          <MenuBurger
            className="h-5 w-5"
            onClick={() => setOpen(true)}
            data-testid="menuburger-icon"
          />
        )}
      </FlexRow>

      {open && <DropdownMenu close={() => setOpen(false)} />}
    </>
  );
};

type DropdownMenuProps = {
  close: () => void;
};

const DropdownMenu = ({ close }: DropdownMenuProps) => {
  const currentLang = useSelector((state) => state.user.lang) as string;
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.dropdownMenu}>
      <NavLinks activeClassName={styles.activeLink} onClick={close} />
      <hr />
      <ActiveLink
        href="/account"
        className={styles.linkWithIcon}
        activeClassName={styles.activeLink}
      >
        <UserIcon user={userMock} />
        <span>{t("components.navbar.account")}</span>
      </ActiveLink>
      <ActiveLink
        href="/account#languages"
        className={styles.linkWithIcon}
        activeClassName={styles.activeLink}
      >
        <CountryFlag lang={currentLang} className={styles.countryFlag} />
        <span>{t("common.lang.change_language")}</span>
      </ActiveLink>
      <hr />
      <Link href="logout">{t("components.navbar.logout")}</Link>
    </FlexCol>
  );
};

const DesktopView = (): JSX.Element => (
  <>
    <FlexRow className={styles.items}>
      <NavLinks />
      <SearchInput />
    </FlexRow>

    <Settings />
  </>
);

const NavLinks = ({ ...rest }) => {
  const { t } = useTranslation();

  return (
    <>
      <ActiveLink
        activeClassName={styles.activeBorder}
        inactiveClassName={styles.inactiveBorder}
        href="/"
        {...rest}
      >
        {t("components.navbar.home")}
      </ActiveLink>
      <ActiveLink
        activeClassName={styles.activeBorder}
        inactiveClassName={styles.inactiveBorder}
        href="/movies/favorites"
        {...rest}
      >
        {t("components.navbar.my_list")}
      </ActiveLink>
    </>
  );
};

// The <a> markup is mandatory here to avoid errors
// https://github.com/vercel/next.js/issues/7915
const BrandLogo = () => {
  const isTabletOrMobile = useResponsiveAttribute();
  const logo = isTabletOrMobile
    ? "/icons/hypertube-short.png"
    : "/icons/hypertube.png";
  const width = isTabletOrMobile ? 17 : 115;

  return (
    <Link href="/">
      <a href="/" className="flex">
        <Image
          src={logo}
          alt="Hypertube logo"
          width={width}
          height={31}
          priority
          className="cursor-pointer"
        />
      </a>
    </Link>
  );
};

const SearchInput = () => {
  const { t } = useTranslation();
  const searchInput = useSelector(
    (state: RootState) => state.movie.searchInput,
  ) as string;
  const dispatch = useDispatch();
  const isVisible = searchInput.length > 0;
  const [showInput, setShowInput] = React.useState(isVisible);
  const cancelSearch = classNames({
    "cursor-pointer h-4 w-4": true,
    invisible: !isVisible,
  });

  const handleSearch = () => {
    console.log(`Request movies with name [${searchInput}]`);
  };

  const handleClose = () => {
    dispatch(setSearchInput(""));
    setShowInput(false);
  };

  return showInput ? (
    <FlexRow className={styles.searchGroup}>
      <Magnifier
        className="h-4 w-4"
        onClick={handleSearch}
        data-testid="submit-search"
      />
      <input
        placeholder={t("components.navbar.search")}
        value={searchInput}
        onChange={(evt) => dispatch(setSearchInput(evt.target.value))}
        onBlur={() => !isVisible && setShowInput(false)}
        autoFocus
      />
      <Cross
        className={cancelSearch}
        onClick={handleClose}
        data-testid="close-search"
      />
    </FlexRow>
  ) : (
    <Magnifier
      onClick={() => setShowInput(true)}
      className="h-4 w-4 cursor-pointer self-center"
      data-testid="magnifier-icon"
    />
  );
};
