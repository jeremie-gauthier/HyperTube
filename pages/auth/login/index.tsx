import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm, { FormErrors, HookForm } from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { LoginForm } from "@/lib/types/login";
import resolver from "@/lib/resolvers/login";
import Checkbox from "@/components/Checkbox";
import { FlexCol } from "@/components/Flex";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { OAuthLinks, SignupLink } from "@/components/Links";
import PasswordTips from "@/components/PasswordTips";
import styles from "./login.module.scss";

const initialState: LoginForm = {
  username: "",
  password: "",
  remember: false,
};

function Login() {
  const { t } = useTranslation();
  const submit = (values: LoginForm) => {
    console.log(values);
    return new Promise<LoginForm>((resolve) => resolve(values));
  };

  const methods = useForm<LoginForm>(submit, resolver, initialState);

  return (
    <main className={styles.container}>
      <PerfectScrollbar className={styles.scrollContainer}>
        <h1 className="title">{t("pages.auth.login.login")}</h1>
        <FormLogin methods={methods} />
        <Extras errors={methods.errors} />
      </PerfectScrollbar>
    </main>
  );
}

Login.Layout = AuthLayout;
Login.Title = "pages.auth.authentication";
export default Login;

const FormLogin = ({ methods }: { methods: HookForm<LoginForm> }) => {
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

const Extras = ({ errors }: { errors: FormErrors<LoginForm> }) => (
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

const hasInvalidPwd = (errors: FormErrors<LoginForm>) =>
  "password" in errors && errors.password === "common.forms.invalid_pwd";
