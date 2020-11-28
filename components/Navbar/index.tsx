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
import Magnifier from "../../public/icons/magnifier.svg";
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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(evt.target.value));
  };

  return (
    <FlexRow className={styles.searchInput}>
      <Magnifier />
      <input
        placeholder={t("components.navbar.search")}
        value={searchInput}
        onChange={handleChange}
      />
    </FlexRow>
  );
};
