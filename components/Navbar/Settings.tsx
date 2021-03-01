import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useHover from "@react-hook/hover";
import { LangSettings } from "@/components/CountryFlag";
import UserIcon from "@/components/UserIcon";
import { User } from "@/types/user";
import useFetch from "@/hooks/api/useFetch";
import styles from "./Navbar.module.scss";

export default function Settings() {
  return (
    <FlexRow className={styles.settings}>
      <UserSettings />
      <LangSettings />
    </FlexRow>
  );
}

const UserSettings = () => {
  const hoverableNode = React.useRef(null);
  const isHovering = useHover(hoverableNode);
  const { data: user } = useFetch<User>(`/api/users/${-42}`);

  return (
    <FlexCol ref={hoverableNode} className="relative">
      {user && <UserIcon user={user} />}

      {isHovering && (
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
