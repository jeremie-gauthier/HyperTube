import React from "react";
import Head from "next/head";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { TFormValues } from "@/lib/types/login";
import resolver from "@/lib/resolvers/login";
import Checkbox from "@/components/Checkbox";
import { FlexRow } from "@/components/Flex";
import Link from "next/link";
import { LangSettings } from "@/components/CountryFlag";
import styles from "./login.module.scss";
import Oauth42 from "../../public/icons/42_logo.svg";

const initialState: TFormValues = {
  username: "",
  password: "",
  remember: false,
};

function Login() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <HeadContent />
      <div className="absolute top-4 right-4">
        <LangSettings />
      </div>

      <h1>{t("pages.auth.login.connection")}</h1>
      <LoginForm />
      <OAuthLinks />
      <SignupLink />
    </main>
  );
}

Login.Layout = AuthLayout;
export default Login;

const LoginForm = () => {
  const { t } = useTranslation();
  const submit = (values: TFormValues) => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<TFormValues>(
    submit,
    resolver,
    initialState,
  );

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <FormInput
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder={t("models.user.username")}
        error={errors.username}
        required
      />
      <FormInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder={t("models.user.password")}
        error={errors.password}
        required
      />
      <button type="submit">{t("pages.auth.login.connection")}</button>
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
    <Link href="/auth/login/intra42">
      <FlexRow className="items-center space-x-2 cursor-pointer text-sm">
        <Oauth42 className="h-4 w-4 cursor-pointer" />
        <span>{t("pages.auth.login.login_with_42")}</span>
      </FlexRow>
    </Link>
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
    <div className={styles.registerLink}>
      <p>{t("pages.auth.login.first_visit")}</p>
      <Link href="/auth/register">{t("pages.auth.login.register")}</Link>
    </div>
  );
};
