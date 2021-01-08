import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
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
