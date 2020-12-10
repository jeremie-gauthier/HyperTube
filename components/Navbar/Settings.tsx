import React from "react";
import { FlexRow, FlexCol } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import userMock from "@/tests/__mocks__/user"; // MOCK
import useHover from "@react-hook/hover";
import { LangSettings } from "@/components/CountryFlag";
import UserIcon from "@/components/UserIcon";
import styles from "./Navbar.module.scss";

export default function Settings(): JSX.Element {
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

  return (
    <FlexCol ref={hoverableNode} className="relative">
      <UserIcon user={userMock} />

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
      <Link href="account">{t("components.navbar.account")}</Link>
      <Link href="logout">{t("components.navbar.logout")}</Link>
    </FlexCol>
  );
};
