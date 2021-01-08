import React from "react";
import Head from "next/head";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { TLoginForm } from "@/lib/types/login";
import resolver from "@/lib/resolvers/login";
import Checkbox from "@/components/Checkbox";
import { FlexCol, FlexRow } from "@/components/Flex";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import styles from "./login.module.scss";
import Oauth42 from "../../../public/icons/42_logo.svg";

const initialState: TLoginForm = {
  username: "",
  password: "",
  remember: false,
};

function Login() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <HeadContent />

      <PerfectScrollbar className={styles.scrollContainer}>
        <h1>{t("pages.auth.login.login")}</h1>
        <LoginForm />
        <OAuthLinks />
        <SignupLink />
        <PwdForgottenLink />
      </PerfectScrollbar>
    </main>
  );
}

Login.Layout = AuthLayout;
export default Login;

const LoginForm = () => {
  const { t } = useTranslation();
  const submit = (values: TLoginForm) => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<TLoginForm>(
    submit,
    resolver,
    initialState,
  );

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <FlexCol className={styles.fieldsGroup}>
        <FormInput
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder={t("models.user.username")}
          error={errors.username}
        />
        <FormInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder={t("models.user.password")}
          error={errors.password}
        />
      </FlexCol>
      <button type="submit">{t("pages.auth.login.login")}</button>
      <Checkbox
        label={t("pages.auth.login.remember")}
        name="remember"
        checked={values.remember}
        onChange={handleChange}
      />
    </form>
  );
};

const OAuthLinks = () => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.OAuthLinks}>
      <Link href="/auth/login/intra42">
        <FlexRow className="items-center space-x-2 cursor-pointer text-sm">
          <Oauth42 className="h-4 w-4 cursor-pointer" />
          <span>{t("pages.auth.login.login_with_42")}</span>
        </FlexRow>
      </Link>
    </FlexCol>
  );
};

const HeadContent = () => {
  const { t } = useTranslation();

  return (
    <Head>
      <title>{t("pages.auth.authentication")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

const SignupLink = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <p>{t("pages.auth.login.first_visit")}</p>
      <Link href="/auth/register">{t("pages.auth.login.register")}</Link>
    </div>
  );
};

const PwdForgottenLink = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <Link href="/auth/reset">{t("pages.auth.reset.pwd_forgotten")}</Link>
    </div>
  );
};
