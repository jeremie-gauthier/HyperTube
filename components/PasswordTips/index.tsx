import { useTranslation } from "react-i18next";

export default function PasswordTooltip({ className }: { className: string }) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <p>{t("pages.auth.register.pwd.your_password")}</p>
      <ul>
        <li>{t("pages.auth.register.pwd.minimal_length")}</li>
        <li>{t("pages.auth.register.pwd.should_contain_min")}</li>
        <li>{t("pages.auth.register.pwd.should_contain_maj")}</li>
        <li>{t("pages.auth.register.pwd.should_contain_number")}</li>
        <li>{t("pages.auth.register.pwd.should_contain_special")}</li>
      </ul>
    </div>
  );
}
