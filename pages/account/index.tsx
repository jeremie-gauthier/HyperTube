import Dropdown from "@/components/Dropdown";
import SiteLayout from "@/components/Layouts/SiteLayout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
import useUser from "@/hooks/useUser";
import { langs } from "@/locales/i18n";
import { useRouter } from "next/router";
import useForm, { HookForm } from "@/hooks/useForm";
import { AccountForm } from "@/lib/types/account";
import resolver from "@/lib/resolvers/account";
import SwitchableInput from "@/components/SwitchableInput";
import styles from "./account.module.scss";

function Account() {
  const { t } = useTranslation();
  const { user } = useUser(-42);
  const initialState = {
    username: user.username,
    lastname: user.lastname,
    firstname: user.firstname,
    language: user.language,
  };

  const onSubmit = (values: AccountForm) => {
    console.log(values);
  };

  // No ! Must use uncontrolled form instead
  const methods = useForm<AccountForm>(onSubmit, resolver, initialState);

  return (
    <main className={styles.container}>
      <h1 className="title">{t("pages.account.my_account")}</h1>
      <ScrollBar className={styles.scrollContainer}>
        <form onSubmit={methods.handleSubmit}>
          <SecurityParams methods={methods} />
          <ProfileParams methods={methods} />
          <PreferenceParams methods={methods} />
        </form>
      </ScrollBar>
    </main>
  );
}

Account.Layout = SiteLayout;
Account.Title = "pages.account.my_account";
export default Account;

type ParamsProps = {
  methods: HookForm<AccountForm>;
};

const SecurityParams = ({ methods }: ParamsProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42);

  return (
    <section id="security">
      <Dropdown
        title={<h2>{t("pages.account.security.security")}</h2>}
        className={styles.dropdown}
      >
        <Dropdown.Element>
          <div className="font-semibold">{user.email}</div>
          <Link href="account/change/email">
            {t("pages.account.security.edit_email")}
          </Link>
        </Dropdown.Element>
        <Dropdown.Element>
          <SwitchableInput>
            <SwitchableInput.Input
              className={styles.switchableInput}
              name="username"
              placeholder={t("models.user.username")}
              methods={methods}
            />
            <SwitchableInput.Toggle
              label={t("pages.account.security.edit_username")}
              isLoading={false}
              className="flex flex-row items-center space-x-4"
            />
          </SwitchableInput>
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

const ProfileParams = ({ methods }: ParamsProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42);

  return (
    <section id="profile">
      <Dropdown
        title={<h2>{t("pages.account.profile.my_profile")}</h2>}
        className={styles.dropdown}
      >
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

const PreferenceParams = ({ methods }: ParamsProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42);
  const { asPath } = useRouter();

  return (
    <section id="preferences">
      <Dropdown
        title={<h2>{t("pages.account.preferences.preferences")}</h2>}
        initialState={asPath.includes("#preferences")}
        className={styles.dropdown}
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
