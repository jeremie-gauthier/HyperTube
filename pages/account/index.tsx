/* eslint-disable max-lines-per-function */
import Dropdown from "@/components/Dropdown";
import SiteLayout from "@/components/Layouts/SiteLayout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/api/useFetch";
import { langs, Languages } from "@/locales/i18n";
import { useRouter } from "next/router";
import useForm from "@/hooks/useForm";
import {
  checkUsername,
  checkLastname,
  checkFirstname,
} from "@/lib/resolvers/checkers";
import { Methods } from "@/types/requests";
import SwitchableInput from "@/components/SwitchableInput";
import React from "react";
import fetcher from "@/lib/fetcher";
import CountryFlag from "@/components/CountryFlag";
import { User } from "@/types/user";
import pick from "@ramda/pick";
import UserPictureModal from "@/components/Modal/UserPictureModal";
import Image from "next/image";
import { FlexCol } from "@/components/Flex";
import { toastError } from "@/components/Toast";
import ScrollBar from "react-perfect-scrollbar";
import styles from "./account.module.scss";
import { ReactComponent as EditIcon } from "../../public/icons/editIcon.svg";

type ServerSideProps = {
  user: User | null;
};

function Account({ user }: ServerSideProps) {
  const { t } = useTranslation();

  return user === null ? (
    <div>ERROR PAGE GOES HERE</div>
  ) : (
    <ScrollBar>
      <main className={styles.container}>
        <h1 className="title">{t("pages.account.my_account")}</h1>
        <SecurityParams initialData={user} />
        <ProfileParams initialData={user} />
        <PreferenceParams initialData={user} />
      </main>
    </ScrollBar>
  );
}

Account.Layout = SiteLayout;
Account.Title = "pages.account.my_account";
export default Account;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;
  try {
    const user = await fetcher(`${api}/users/${-42}`, {
      method: Methods.GET,
    });
    return { props: { user } };
  } catch (error) {
    return { props: { user: null } };
  }
}

type SWRConfigProps = {
  initialData: User;
};

const SecurityParams = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { data: user } = useFetch<User>(`/api/users/${-42}`, { initialData });

  return (
    <section id="security">
      <Dropdown
        title={<h2>{t("pages.account.security.security")}</h2>}
        className={styles.dropdown}
      >
        <Dropdown.Element>
          <div className="font-semibold">{user?.email}</div>
          <Link href="account/email">
            {t("pages.account.security.edit_email")}
          </Link>
        </Dropdown.Element>

        <UsernameForm initialData={initialData} />

        <Dropdown.Element>
          <div>{"*".repeat(8)}</div>
          <Link href="account/password">
            {t("pages.account.security.edit_password")}
          </Link>
        </Dropdown.Element>
      </Dropdown>
    </section>
  );
};

const ProfileParams = ({ initialData }: SWRConfigProps) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const { data: user } = useFetch<User>(`/api/users/${-42}`, { initialData });
  const [isModalPictureOpen, setIsModalPictureOpen] = React.useState(false);

  return (
    <section id="profile">
      <Dropdown
        initialState={asPath.includes("#profile")}
        title={
          <FlexCol>
            <h2>{t("pages.account.profile.my_profile")}</h2>
            <div className={styles.desktopPicture}>
              <div className={styles.editPicture}>
                {user?.picture && (
                  <Image
                    src={`/img/avatar/avatar${user.picture}.png`}
                    alt="Current profile picture"
                    width={75}
                    height={75}
                    quality={100}
                    className={styles.picture}
                    key={user.picture}
                    onClick={() => setIsModalPictureOpen(true)}
                  />
                )}
                <EditIcon className={styles.editIcon} />
              </div>
            </div>
          </FlexCol>
        }
        className={styles.dropdown}
      >
        <LastnameForm initialData={initialData} />
        <FirstnameForm initialData={initialData} />
        <Dropdown.Element className={styles.mobilePicture}>
          <Image
            src={`/img/avatar/avatar${user?.picture}.png`}
            alt="Current profile picture"
            width={25}
            height={25}
            quality={100}
            className={styles.picture}
            key={user?.picture}
          />
          <Link href="/account/picture">
            {t("pages.account.profile.edit_profile_picture")}
          </Link>
        </Dropdown.Element>

        {isModalPictureOpen && (
          <UserPictureModal close={() => setIsModalPictureOpen(false)} />
        )}
      </Dropdown>
    </section>
  );
};

const PreferenceParams = ({ initialData }: SWRConfigProps) => {
  const { t, i18n } = useTranslation();
  const { data: user, mutate } = useFetch<User>(`/api/users/${-42}`, {
    initialData,
  });
  const { asPath } = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [language, setLanguage] = React.useState(user?.language ?? "en");

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(evt.target.value as Languages);
  };

  const handleSubmit = () => {
    mutate(async (currentUser) => {
      try {
        const newUser = await fetcher<User>(`/api/users/${-42}`, {
          method: Methods.PATCH,
          body: JSON.stringify({ language }),
        });
        return newUser;
      } catch (error) {
        toastError(error.info?.message);
        return currentUser;
      }
    }, false);
    i18n.changeLanguage(language);
    setIsEditing(false);
  };

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
              <select
                className={styles.selectLanguages}
                onChange={handleChange}
                value={language}
              >
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
                <button type="button" onClick={handleSubmit}>
                  {t("common.buttons.submit")}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.languages}>
                <CountryFlag lang={user?.language ?? "en"} />
                <p>{t(langs[user?.language ?? "en"])}</p>
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
  const { data: user, mutate } = useFetch<User>(`/api/users/${-42}`, {
    initialData,
  });

  const onSubmit = async (values: UsernameFormType) => {
    const newUser = await mutate(async (currentUser) => {
      try {
        const newUser = await fetcher<User>(`/api/users/${-42}`, {
          method: Methods.PATCH,
          body: JSON.stringify(values),
        });
        return newUser;
      } catch (error) {
        toastError(error.info?.message);
        return currentUser;
      }
    }, false);
    return { username: newUser?.username ?? user?.username ?? "" };
  };

  const methods = useForm<UsernameFormType>(
    onSubmit,
    checkUsername,
    pick(["username"], user),
  );

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
  const { data: user, mutate } = useFetch<User>(`/api/users/${-42}`, {
    initialData,
  });

  const onSubmit = async (values: LastnameFormType) => {
    const newUser = await mutate(async (currentUser) => {
      try {
        const newUser = await fetcher<User>(`/api/users/${-42}`, {
          method: Methods.PATCH,
          body: JSON.stringify(values),
        });
        return newUser;
      } catch (error) {
        toastError(error.info?.message);
        return currentUser;
      }
    }, false);
    return { lastname: newUser?.lastname ?? user?.lastname ?? "" };
  };

  const methods = useForm<LastnameFormType>(
    onSubmit,
    checkLastname,
    pick(["lastname"], user),
  );

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
  const { data: user, mutate } = useFetch<User>(`/api/users/${-42}`, {
    initialData,
  });

  const onSubmit = async (values: FirstnameFormType) => {
    const newUser = await mutate(async (currentUser) => {
      try {
        const newUser = await fetcher<User>(`/api/users/${-42}`, {
          method: Methods.PATCH,
          body: JSON.stringify(values),
        });
        return newUser;
      } catch (error) {
        toastError(error.info?.message);
        return currentUser;
      }
    }, false);
    return { firstname: newUser?.firstname ?? user?.firstname ?? "" };
  };

  const methods = useForm<FirstnameFormType>(
    onSubmit,
    checkFirstname,
    pick(["firstname"], user),
  );

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
