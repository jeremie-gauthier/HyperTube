import Dropdown from "@/components/Dropdown";
import SiteLayout from "@/components/Layouts/SiteLayout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
import useUser from "@/hooks/useUser";
import { langs } from "@/locales/i18n";
import { useRouter } from "next/router";
import styles from "./account.module.scss";

function Account() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1 className="title">{t("pages.account.my_account")}</h1>
      <ScrollBar className={styles.scrollContainer}>
        <SecurityParams />
        <ProfileParams />
        <PreferenceParams />
      </ScrollBar>
    </main>
  );
}

Account.Layout = SiteLayout;
Account.Title = "pages.account.my_account";
export default Account;

const SecurityParams = () => {
  const { t } = useTranslation();
  const { user } = useUser(-42);

  return (
    <section id="security">
      <Dropdown title={<h2>{t("pages.account.security.security")}</h2>}>
        <Dropdown.Element>
          <div className="font-semibold">{user.email}</div>
          <Link href="account/change/email">
            {t("pages.account.security.edit_email")}
          </Link>
        </Dropdown.Element>
        <Dropdown.Element>
          <div>{user.username}</div>
          <Link href="account/change/username">
            {t("pages.account.security.edit_username")}
          </Link>
        </Dropdown.Element>
        <Dropdown.Element>
          <div>{"*".repeat(8)}</div>
          <Link href="account/change/password">
            {t("pages.account.security.edit_password")}
          </Link>
        </Dropdown.Element>
      </Dropdown>
    </section>
  );
};

const ProfileParams = () => {
  const { t } = useTranslation();
  const { user } = useUser(-42);

  return (
    <section id="profile">
      <Dropdown title={<h2>{t("pages.account.profile.my_profile")}</h2>}>
        <Dropdown.Element>
          <div>{user.lastname}</div>
          <button type="button">
            {t("pages.account.profile.edit_lastname")}
          </button>
        </Dropdown.Element>
        <Dropdown.Element>
          <div>{user.firstname}</div>
          <button type="button">
            {t("pages.account.profile.edit_firstname")}
          </button>
        </Dropdown.Element>
        <Dropdown.Element>
          <div>|Profile picture here|</div>
          <button type="button">
            {t("pages.account.profile.edit_profile_picture")}
          </button>
        </Dropdown.Element>
      </Dropdown>
    </section>
  );
};

const PreferenceParams = () => {
  const { t } = useTranslation();
  const { user } = useUser(-42);
  const { asPath } = useRouter();

  return (
    <section id="preferences">
      <Dropdown
        title={<h2>{t("pages.account.preferences.preferences")}</h2>}
        initialState={asPath.includes("#preferences")}
      >
        <Dropdown.Element>
          <div>{t(langs[user.language])}</div>
          <button type="button">
            {t("pages.account.preferences.edit_default_language")}
          </button>
        </Dropdown.Element>
      </Dropdown>
    </section>
  );
};
