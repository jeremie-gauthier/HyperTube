/* eslint-disable max-lines-per-function */
import Dropdown from "@/components/Dropdown";
import SiteLayout from "@/components/Layouts/SiteLayout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
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
import UserPictureModal from "@/components/Modal/UserPictureModal";
import Image from "next/image";
import { FlexCol } from "@/components/Flex";
import ScrollBar from "react-perfect-scrollbar";
import useUser, { usePatchUser, usersRoute } from "@/hooks/api/useUser";
import styles from "./account.module.scss";
import { ReactComponent as EditIcon } from "../../public/icons/editIcon.svg";

type ServerSideProps = {
  user: User | null;
};

function Account({ user }: ServerSideProps) {
  return user === null ? (
    <div>ERROR PAGE GOES HERE</div>
  ) : (
    <AccountContent initialData={user} />
  );
}

Account.Layout = SiteLayout;
Account.Title = "pages.account.my_account";
export default Account;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;
  try {
    const user = await fetcher<User>(`${api}${usersRoute("-42")}`, {
      method: Methods.GET,
    });
    return { props: { user } };
  } catch (error) {
    return { props: { user: null } };
  }
}

const AccountContent = ({ initialData }: { initialData: User }) => {
  const { t } = useTranslation();
  const { data } = useUser(initialData.id, { initialData });
  const patchUser = usePatchUser(initialData.id);

  return (
    <ScrollBar>
      <main className={styles.container}>
        <h1 className="title">{t("pages.account.my_account")}</h1>
        <SecurityParams user={data ?? initialData} patchUser={patchUser} />
        <ProfileParams user={data ?? initialData} patchUser={patchUser} />
        <PreferenceParams user={data ?? initialData} patchUser={patchUser} />
      </main>
    </ScrollBar>
  );
};

type UserForm = {
  user: User;
  patchUser: (newValues: Partial<User>) => Promise<User | undefined>;
};

const SecurityParams = ({ user, patchUser }: UserForm) => {
  const { t } = useTranslation();

  return (
    <section id="security">
      <Dropdown
        title={<h2>{t("pages.account.security.security")}</h2>}
        className={styles.dropdown}
      >
        <Dropdown.Element>
          <div className="font-semibold">{user.email}</div>
          <Link href="account/email">
            {t("pages.account.security.edit_email")}
          </Link>
        </Dropdown.Element>

        <UsernameForm username={user.username} patchUser={patchUser} />

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

const ProfileParams = ({ user, patchUser }: UserForm) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [isModalPictureOpen, setIsModalPictureOpen] = React.useState(false);

  return (
    <section id="profile">
      <Dropdown
        initialState={asPath.includes("#profile")}
        title={
          <FlexCol>
            <h2>{t("pages.account.profile.my_profile")}</h2>
            <div
              role="button"
              tabIndex={0}
              className={styles.desktopPicture}
              onClick={() => setIsModalPictureOpen(true)}
              onKeyPress={() => setIsModalPictureOpen(true)}
            >
              <div className={styles.editPicture}>
                <Image
                  src={`/img/avatar/avatar${user.picture}.png`}
                  alt="Current profile picture"
                  width={75}
                  height={75}
                  quality={100}
                  className={styles.picture}
                  key={user.picture}
                />
                <EditIcon className={styles.editIcon} />
              </div>
            </div>
          </FlexCol>
        }
        className={styles.dropdown}
      >
        <LastnameForm lastname={user.lastname} patchUser={patchUser} />
        <FirstnameForm firstname={user.firstname} patchUser={patchUser} />
        <Dropdown.Element className={styles.mobilePicture}>
          <Image
            src={`/img/avatar/avatar${user.picture}.png`}
            alt="Current profile picture"
            width={25}
            height={25}
            quality={100}
            className={styles.picture}
            key={user.picture}
          />
          <Link href="/account/picture">
            {t("pages.account.profile.edit_profile_picture")}
          </Link>
        </Dropdown.Element>

        {isModalPictureOpen && (
          <UserPictureModal
            user={user}
            close={() => setIsModalPictureOpen(false)}
          />
        )}
      </Dropdown>
    </section>
  );
};

const PreferenceParams = ({ user, patchUser }: UserForm) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [language, setLanguage] = React.useState(user.language);

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(evt.target.value as Languages);
  };

  const handleSubmit = async () => {
    patchUser({ language });
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
type UsernameFormProps = UsernameFormType & Pick<UserForm, "patchUser">;

const UsernameForm = ({ username, patchUser }: UsernameFormProps) => {
  const { t } = useTranslation();

  const onSubmit = async (values: UsernameFormType) => {
    const newUser = await patchUser(values);
    return { username: newUser?.username ?? username };
  };

  const methods = useForm<UsernameFormType>(onSubmit, checkUsername, {
    username,
  });

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
type LastnameFormProps = LastnameFormType & Pick<UserForm, "patchUser">;

const LastnameForm = ({ lastname, patchUser }: LastnameFormProps) => {
  const { t } = useTranslation();

  const onSubmit = async (values: LastnameFormType) => {
    const newUser = await patchUser(values);
    return { lastname: newUser?.lastname ?? lastname };
  };

  const methods = useForm<LastnameFormType>(onSubmit, checkLastname, {
    lastname,
  });

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
type FirstnameFormProps = FirstnameFormType & Pick<UserForm, "patchUser">;

const FirstnameForm = ({ firstname, patchUser }: FirstnameFormProps) => {
  const { t } = useTranslation();

  const onSubmit = async (values: FirstnameFormType) => {
    const newUser = await patchUser(values);
    return { firstname: newUser?.firstname ?? firstname };
  };

  const methods = useForm<FirstnameFormType>(onSubmit, checkFirstname, {
    firstname,
  });

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
