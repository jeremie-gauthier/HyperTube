/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { FlexCol, FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import ActiveLink from "@/components/ActiveLink";
import useSelector from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setSearchInput } from "@/state/movies/actions";
import classnames from "classnames";
import UserIcon from "@/components/UserIcon";
import CountryFlag from "@/components/CountryFlag";
import { useRouter } from "next/router";
import { useMe } from "@/hooks/api/useUser";
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
  const { data: user } = useMe();
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
        {user && <UserIcon user={user} />}
        <span>{t("components.navbar.account")}</span>
      </ActiveLink>
      <ActiveLink
        href="/account#preferences"
        className={styles.linkWithIcon}
        activeClassName={styles.activeLink}
      >
        <CountryFlag
          lang={user?.language ?? "en"}
          className={styles.countryFlag}
        />
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
  const router = useRouter();
  const searchInput = useSelector((state) => state.movie.searchInput);
  const isVisible = searchInput.length > 0;
  const [showInput, setShowInput] = React.useState(isVisible);
  const cancelSearch = classnames({ invisible: !isVisible });
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSearchInput(""));
    setShowInput(false);
  };

  return showInput ? (
    <FlexRow className={styles.searchGroup}>
      <Link href="/">
        <a href="/">
          <Magnifier data-testid="submit-search" />
        </a>
      </Link>
      <input
        placeholder={t("components.navbar.search")}
        value={searchInput}
        onChange={(evt) => dispatch(setSearchInput(evt.target.value))}
        onKeyDown={(evt) => (evt.key === "Enter" ? router.push("/") : null)}
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
