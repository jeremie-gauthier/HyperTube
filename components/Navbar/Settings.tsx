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

type HoverStatus = "idle" | "UserSettings" | "LangSettings";

export default function Settings(): JSX.Element {
  const [hoverStatus, setHoverStatus] = React.useState<HoverStatus>("idle");

  return (
    <FlexRow className={styles.settings}>
      <UserSettings hoverStatus={hoverStatus} setHoverStatus={setHoverStatus} />
      <LangSettings hoverStatus={hoverStatus} setHoverStatus={setHoverStatus} />
    </FlexRow>
  );
}

type SettingsProps = {
  hoverStatus: HoverStatus;
  setHoverStatus: React.Dispatch<React.SetStateAction<HoverStatus>>;
};

const UserSettings = ({ hoverStatus, setHoverStatus }: SettingsProps) => {
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, { leaveDelay: 500 });
  const canDisplay = isHovering && hoverStatus !== "LangSettings";

  React.useEffect(() => {
    if (isHovering) setHoverStatus("UserSettings");
  }, [isHovering, setHoverStatus]);

  return (
    <FlexCol ref={hoverableNode} className={`${styles.frame} bg-red`}>
      <span>{getInitials(userMock)}</span>

      {canDisplay && (
        <div className={styles.floater}>
          <div className={styles.arrow} />
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

const LangSettings = ({ hoverStatus, setHoverStatus }: SettingsProps) => {
  const currentLang = useSelector((state) => state.user.lang) as string;
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode, { leaveDelay: 500 });
  const canDisplay = isHovering && hoverStatus !== "UserSettings";

  React.useEffect(() => {
    if (isHovering) setHoverStatus("LangSettings");
  }, [isHovering, setHoverStatus]);

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
