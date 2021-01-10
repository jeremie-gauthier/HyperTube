import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm, { FormErrors, HookForm } from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { TLoginForm } from "@/lib/types/login";
import resolver from "@/lib/resolvers/login";
import Checkbox from "@/components/Checkbox";
import { FlexCol, FlexRow } from "@/components/Flex";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SignupLink } from "@/components/Links";
import PasswordTips from "@/components/PasswordTips";
import styles from "./login.module.scss";
import Oauth42 from "../../../public/icons/42_logo.svg";

const initialState: TLoginForm = {
  username: "",
  password: "",
  remember: false,
};

function Login() {
  const { t } = useTranslation();
  const submit = (values: TLoginForm) => {
    console.log(values);
  };

  const methods = useForm<TLoginForm>(submit, resolver, initialState);

  return (
    <main className={styles.container}>
      <PerfectScrollbar className={styles.scrollContainer}>
        <h1>{t("pages.auth.login.login")}</h1>
        <LoginForm methods={methods} />
        <Extras errors={methods.errors} />
      </PerfectScrollbar>
    </main>
  );
}

Login.Layout = AuthLayout;
Login.Title = "pages.auth.authentication";
export default Login;

const LoginForm = ({ methods }: { methods: HookForm<TLoginForm> }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = methods;

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

const Extras = ({ errors }: { errors: FormErrors<TLoginForm> }) => (
  <div className={styles.extras}>
    <FlexCol>
      <OAuthLinks />
      <SignupLink />
      <PwdForgottenLink />
    </FlexCol>
    <FlexCol>
      {hasInvalidPwd(errors) && <PasswordTips className={styles.pwdTips} />}
    </FlexCol>
  </div>
);

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

const PwdForgottenLink = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <Link href="/auth/reset">
        {t("pages.auth.reset.pwd_forgotten_question")}
      </Link>
    </div>
  );
};

const hasInvalidPwd = (errors: FormErrors<TLoginForm>) =>
  "password" in errors && errors.password === "common.forms.invalid_pwd";
