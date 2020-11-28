import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import userMock from "@/tests/__mocks__/user"; // MOCK
import { getInitials } from "@/lib/helpers";
import useHover from "@react-hook/hover";
import { langs, TLang } from "@/locales/i18n";
import CountryFlag from "@/components/CountryFlag";
import ActiveLink from "@/components/ActiveLink";
import { RootState } from "@/state/types";
import useSelector from "@/hooks/useSelector";
import useDispatch from "@/hooks/useDispatch";
import { setLang } from "@/state/users/actions";
import { setSearchInput } from "@/state/movies/actions";
import Magnifier from "../public/icons/magnifier.svg";
import styles from "./Navbar.module.scss";

type HoverStatus = "idle" | "UserMenu" | "LangFlag";

export default function Navbar(): JSX.Element {
  const [hoverStatus, setHoverStatus] = React.useState<HoverStatus>("idle");

  return (
    <FlexRow className={styles.container}>
      <BrandLogo />

      <FlexRow className={styles.items}>
        <Navigation />
        <SearchInput />
      </FlexRow>

      <FlexRow className={styles.settings}>
        <UserMenu hoverStatus={hoverStatus} setHoverStatus={setHoverStatus} />
        <LangFlag hoverStatus={hoverStatus} setHoverStatus={setHoverStatus} />
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

type SettingsProps = {
  hoverStatus: HoverStatus;
  setHoverStatus: React.Dispatch<React.SetStateAction<HoverStatus>>;
};

const UserMenu = ({ hoverStatus, setHoverStatus }: SettingsProps) => {
  const { t } = useTranslation();
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, { leaveDelay: 500 });
  const canDisplay = isHovering && hoverStatus !== "LangFlag";

  React.useEffect(() => {
    if (isHovering) setHoverStatus("UserMenu");
  }, [isHovering, setHoverStatus]);

  return (
    <div ref={hoverableNode} className={styles.frame + " bg-red"}>
      <span>{getInitials(userMock)}</span>

      {canDisplay && (
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

const LangFlag = ({ hoverStatus, setHoverStatus }: SettingsProps) => {
  const currentLang = useSelector((state) => state.user.lang) as TLang;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, { leaveDelay: 500 });
  const canDisplay = isHovering && hoverStatus !== "UserMenu";

  React.useEffect(() => {
    if (isHovering) setHoverStatus("LangFlag");
  }, [isHovering, setHoverStatus]);

  const changeLanguage = (lang: TLang) => {
    i18n.changeLanguage(lang);
    dispatch(setLang(lang));
  };

  return (
    <div ref={hoverableNode} className={styles.frame} data-testid="lang-flag">
      <CountryFlag
        lang={currentLang}
        width={32}
        height={32}
        className="rounded"
      />

      {canDisplay && (
        <div className={styles.floater}>
          <div className={styles.arrow} />
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
        </div>
      )}
    </div>
  );
};
