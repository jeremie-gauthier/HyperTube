import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useHover from "@react-hook/hover";
import { LangSettings } from "@/components/CountryFlag";
import UserIcon from "@/components/UserIcon";
import { useMe } from "@/hooks/api/useUser";
import useOnClickOutside from "use-onclickoutside";
import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";

export default function Settings() {
  return (
    <FlexRow className={styles.settings}>
      <UserSettingsClickable className={styles.isTouchScreen} />
      <UserSettingsHoverable className={styles.isNotTouchScreen} />
      <LangSettings />
    </FlexRow>
  );
}

const UserSettingsHoverable = ({ className }: { className: string }) => {
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);
  const { data: user } = useMe();

  return (
    <FlexCol ref={hoverableNode} className={[className, "relative"].join(" ")}>
      {user && <UserIcon user={user} />}

      {isHovering && (
        <div className={styles.floater}>
          <UserLinks />
        </div>
      )}
    </FlexCol>
  );
};

const UserSettingsClickable = ({ className }: { className: string }) => {
  const { data: user } = useMe();
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const router = useRouter();

  React.useEffect(() => setIsOpen(false), [router.pathname]);

  return (
    <FlexCol ref={ref} className={[className, "relative"].join(" ")}>
      {user && (
        <button type="button" onClick={() => setIsOpen(true)}>
          <UserIcon user={user} />
        </button>
      )}

      {isOpen && (
        <div className={styles.floater}>
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
      <Link href="/account">{t("components.navbar.account")}</Link>
      <Link href="/logout">{t("components.navbar.logout")}</Link>
    </FlexCol>
  );
};
