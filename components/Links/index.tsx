import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FlexCol, FlexRow } from "../Flex";
import Oauth42 from "../../public/icons/42_logo.svg";
import styles from "./Links.module.scss";

export function LoginLink() {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <p>{t("pages.auth.register.already_registered")}</p>
      <Link href="/auth/login">{t("pages.auth.register.login")}</Link>
    </div>
  );
}

export function SignupLink() {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <p>{t("pages.auth.login.first_visit")}</p>
      <Link href="/auth/register">{t("pages.auth.login.register")}</Link>
    </div>
  );
}

export function OAuthLinks() {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.OAuthLinks}>
      <Link href="/auth/login/intra42">
        <FlexRow className={styles.OAuthLink}>
          <Oauth42 />
          <span>{t("pages.auth.login.login_with_42")}</span>
        </FlexRow>
      </Link>
    </FlexCol>
  );
}
