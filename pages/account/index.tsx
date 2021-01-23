/* eslint-disable max-lines-per-function */
import Dropdown from "@/components/Dropdown";
import SiteLayout from "@/components/Layouts/SiteLayout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ScrollBar from "react-perfect-scrollbar";
import useUser from "@/hooks/useUser";
import { langs } from "@/locales/i18n";
import { useRouter } from "next/router";
import useForm from "@/hooks/useForm";
import {
  checkUsername,
  checkLastname,
  checkFirstname,
} from "@/lib/resolvers/checkers";
import SwitchableInput from "@/components/SwitchableInput";
import React from "react";
import fetcher from "@/lib/fetcher";
import CountryFlag from "@/components/CountryFlag";
import { User } from "@/types/user";
import { mutate } from "swr";
import styles from "./account.module.scss";

type ServerSideProps = {
  user: User;
};

function Account({ user }: ServerSideProps) {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <h1 className="title">{t("pages.account.my_account")}</h1>
      <ScrollBar className={styles.scrollContainer}>
        <SecurityParams initialData={user} />
        <ProfileParams initialData={user} />
        <PreferenceParams initialData={user} />
      </ScrollBar>
    </main>
  );
}

Account.Layout = SiteLayout;
Account.Title = "pages.account.my_account";
export default Account;

export async function getServerSideProps() {
  const user = await fetcher(`http://localhost:3000/api/users/${-42}`, {
    method: "GET",
  });
  return { props: { user } };
}

type SWRConfigProps = {
  initialData: User;
};

const SecurityParams = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42, { initialData });

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

        <UsernameForm initialData={initialData} />

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

const ProfileParams = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();

  return (
    <section id="profile">
      <Dropdown
        title={<h2>{t("pages.account.profile.my_profile")}</h2>}
        className={styles.dropdown}
      >
        <LastnameForm initialData={initialData} />
        <FirstnameForm initialData={initialData} />
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

const PreferenceParams = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42, { initialData });
  const { asPath } = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <section id="preferences">
      <Dropdown
        title={<h2>{t("pages.account.preferences.preferences")}</h2>}
        initialState={asPath.includes("#preferences")}
        className={styles.dropdown}
      >
        <Dropdown.Element>
          {isEditing ? (
            <>
              <select className={styles.selectLanguages}>
                {Object.entries(langs).map(([key, value]) => (
                  <option key={key} value={key}>
                    {t(value)}
                  </option>
                ))}
              </select>

              <div className="flex space-x-4">
                <button type="button" onClick={() => setIsEditing(false)}>
                  {t("common.buttons.cancel")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  {t("common.buttons.submit")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.languages}>
                <CountryFlag lang={user.language} />
                <p>{t(langs[user.language])}</p>
              </div>
              <button type="button" onClick={() => setIsEditing(true)}>
                {t("pages.account.preferences.edit_default_language")}
              </button>
            </>
          )}
        </Dropdown.Element>
      </Dropdown>
    </section>
  );
};

type UsernameFormType = Pick<User, "username">;

const UsernameForm = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42, { initialData });

  async function onSubmit(values: UsernameFormType) {
    try {
      mutate(
        `/api/users/${-42}`,
        async () => {
          const newUser = await fetcher(`/api/users/${-42}`, {
            method: "PATCH",
            body: JSON.stringify({ username: values.username }),
          });
          return newUser;
        },
        false,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const methods = useForm<UsernameFormType>(onSubmit, checkUsername, user);

  return (
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
          className={styles.toggle}
          methods={methods}
        />
      </SwitchableInput>
    </Dropdown.Element>
  );
};

type LastnameFormType = Pick<User, "lastname">;

const LastnameForm = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42, { initialData });

  async function onSubmit(values: LastnameFormType) {
    try {
      mutate(
        `/api/users/${-42}`,
        async () => {
          const newUser = await fetcher(`/api/users/${-42}`, {
            method: "PATCH",
            body: JSON.stringify({ lastname: values.lastname }),
          });
          return newUser;
        },
        false,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const methods = useForm<LastnameFormType>(onSubmit, checkLastname, user);

  return (
    <Dropdown.Element>
      <SwitchableInput>
        <SwitchableInput.Input
          className={styles.switchableInput}
          name="lastname"
          placeholder={t("models.user.lastname")}
          methods={methods}
        />
        <SwitchableInput.Toggle
          label={t("pages.account.profile.edit_lastname")}
          isLoading={false}
          className={styles.toggle}
          methods={methods}
        />
      </SwitchableInput>
    </Dropdown.Element>
  );
};

type FirstnameFormType = Pick<User, "firstname">;

const FirstnameForm = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { user } = useUser(-42, { initialData });

  async function onSubmit(values: FirstnameFormType) {
    try {
      mutate(
        `/api/users/${-42}`,
        async () => {
          const newUser = await fetcher(`/api/users/${-42}`, {
            method: "PATCH",
            body: JSON.stringify({ firstname: values.firstname }),
          });
          return newUser;
        },
        false,
      );
    } catch (error) {
      console.error(error);
    }
  }

  const methods = useForm<FirstnameFormType>(onSubmit, checkFirstname, user);

  return (
    <Dropdown.Element>
      <SwitchableInput>
        <SwitchableInput.Input
          className={styles.switchableInput}
          name="firstname"
          placeholder={t("models.user.firstname")}
          methods={methods}
        />
        <SwitchableInput.Toggle
          label={t("pages.account.profile.edit_firstname")}
          isLoading={false}
          className={styles.toggle}
          methods={methods}
        />
      </SwitchableInput>
    </Dropdown.Element>
  );
};
