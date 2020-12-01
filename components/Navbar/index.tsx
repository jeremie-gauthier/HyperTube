/* eslint-disable jsx-a11y/no-autofocus */
import React from "react";
import { FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import ActiveLink from "@/components/ActiveLink";
import { RootState } from "@/state/types";
import useSelector from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setSearchInput } from "@/state/movies/actions";
import classNames from "classnames";
import Magnifier from "../../public/icons/magnifier.svg";
import Cross from "../../public/icons/cross.svg";
import styles from "./Navbar.module.scss";
import Settings from "./Settings";

export default function Navbar(): JSX.Element {
  return (
    <FlexRow className={styles.container}>
      <BrandLogo />

      <FlexRow className={styles.items}>
        <NavLinks />
        <SearchInput />
      </FlexRow>

      <Settings />
    </FlexRow>
  );
}

const NavLinks = () => {
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

const SearchInput = () => {
  const { t } = useTranslation();
  const searchInput = useSelector(
    (state: RootState) => state.movie.searchInput,
  ) as string;
  const dispatch = useDispatch();
  const isVisible = searchInput.length > 0;
  const [showInput, setShowInput] = React.useState(isVisible);
  const cancelSearch = classNames({
    "cursor-pointer": true,
    invisible: !isVisible,
  });

  const handleSearch = () => {
    console.log(`Request movies with name [${searchInput}]`);
  };

  return showInput ? (
    <FlexRow className={styles.searchGroup}>
      <Magnifier height={16} width={16} onClick={handleSearch} />
      <input
        placeholder={t("components.navbar.search")}
        value={searchInput}
        onChange={(evt) => dispatch(setSearchInput(evt.target.value))}
        onBlur={() => !isVisible && setShowInput(false)}
        autoFocus
      />
      <Cross
        height={16}
        width={16}
        className={cancelSearch}
        onClick={() => dispatch(setSearchInput(""))}
      />
    </FlexRow>
  ) : (
    <Magnifier
      height={16}
      width={16}
      onClick={() => setShowInput(true)}
      className="cursor-pointer self-center"
    />
  );
};
