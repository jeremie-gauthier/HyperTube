/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { FlexCol, FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import ActiveLink from "@/components/ActiveLink";
import { RootState } from "@/state/types";
import useSelector from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setSearchInput } from "@/state/movies/actions";
import classnames from "classnames";
import userMock from "@/tests/__mocks__/user"; // MOCK
import UserIcon from "@/components/UserIcon";
import CountryFlag from "@/components/CountryFlag";
import { useRouter } from "next/router";
import Magnifier from "../../public/icons/magnifier.svg";
import Cross from "../../public/icons/cross.svg";
import MenuBurger from "../../public/icons/menu-burger.svg";
import styles from "./Navbar.module.scss";
import Settings from "./Settings";

export default function Navbar() {
  return (
    <FlexRow className={styles.container}>
      <BrandLogo />

      <MobileView className={styles.mobileView} />
      <DesktopView className={styles.desktopView} />
    </FlexRow>
  );
}

const MobileView = ({ className }: { className: string }) => {
  const { asPath } = useRouter();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => setOpen(false), [asPath]);

  return (
    <div className={className}>
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

      {open && <DropdownMenu />}
    </div>
  );
};

const DropdownMenu = () => {
  const currentLang = useSelector((state) => state.user.lang) as string;
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.dropdownMenu}>
      <NavLinks activeClassName={styles.activeLink} />
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
        href="/account#preferences"
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

const DesktopView = ({ className }: { className: string }) => (
  <div className={`${className} items-center flex-1`}>
    <FlexRow className={styles.items}>
      <NavLinks />
      <SearchInput />
    </FlexRow>

    <Settings />
  </div>
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

const BrandLogo = () => (
  <Link href="/">
    <div className={styles.brandLogo} />
  </Link>
);

const SearchInput = () => {
  const { t } = useTranslation();
  const searchInput = useSelector(
    (state: RootState) => state.movie.searchInput,
  ) as string;
  const dispatch = useDispatch();
  const isVisible = searchInput.length > 0;
  const [showInput, setShowInput] = React.useState(isVisible);
  const cancelSearch = classnames({
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
