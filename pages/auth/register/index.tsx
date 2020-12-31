import React from "react";
import Head from "next/head";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm, { FormErrors } from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { TRegisterForm } from "@/lib/types/register";
import Link from "next/link";
import { FlexCol, FlexRow } from "@/components/Flex";
import resolver from "@/lib/resolvers/register";
import { requiredField } from "@/lib/helpers";
import PerfectScrollbar from "react-perfect-scrollbar";
import styles from "./register.module.scss";
import Oauth42 from "../../../public/icons/42_logo.svg";

const initialState: TRegisterForm = {
  username: "",
  password: "",
  cpassword: "",
  email: "",
  lastname: "",
  firstname: "",
};

function Register() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <HeadContent />

      <PerfectScrollbar className={styles.scrollContainer}>
        <h1>{t("pages.auth.register.register")}</h1>
        <RegisterForm />
        <OAuthLinks />
        <LoginLink />
      </PerfectScrollbar>
    </main>
  );
}

Register.Layout = AuthLayout;
export default Register;

const RegisterForm = () => {
  const { t } = useTranslation();
  const submit = (values: TRegisterForm) => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<TRegisterForm>(
    submit,
    resolver,
    initialState,
  );

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <div className={styles.registerForm}>
        <HypertubeFormData
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
        <PersonalFormData
          values={values}
          handleChange={handleChange}
          errors={errors}
        />
      </div>
      <button type="submit">{t("pages.auth.register.register")}</button>
    </form>
  );
};

type FormData = {
  values: TRegisterForm;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors<TRegisterForm>;
};

const HypertubeFormData = ({ values, handleChange, errors }: FormData) => {
  const { t } = useTranslation();
  const [isPwdFocused, setIsPwdFocused] = React.useState(false);

  return (
    <FlexCol className={styles.fieldsGroup}>
      <FormInput
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder={requiredField(t("models.user.username"))}
        error={errors.username}
      />
      <div className="relative">
        <FormInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder={requiredField(t("models.user.password"))}
          error={errors.password}
          onFocus={() => setIsPwdFocused(true)}
          onBlur={() => setIsPwdFocused(false)}
        />
        {isPwdFocused && <PasswordTooltip />}
      </div>
      <FormInput
        type="password"
        name="cpassword"
        value={values.cpassword}
        onChange={handleChange}
        placeholder={requiredField(t("models.user.cpassword"))}
        error={errors.cpassword}
      />
    </FlexCol>
  );
};

const PersonalFormData = ({ values, handleChange, errors }: FormData) => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.fieldsGroup}>
      <FormInput
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder={requiredField(t("models.user.email"))}
        error={errors.email}
      />
      <FormInput
        name="lastname"
        value={values.lastname}
        onChange={handleChange}
        placeholder={requiredField(t("models.user.lastname"))}
        error={errors.lastname}
      />
      <FormInput
        name="firstname"
        value={values.firstname}
        onChange={handleChange}
        placeholder={requiredField(t("models.user.firstname"))}
        error={errors.firstname}
      />
    </FlexCol>
  );
};

const OAuthLinks = () => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.OAuthLinks}>
      <Link href="/auth/register/intra42">
        <FlexRow className="items-center space-x-2 cursor-pointer text-sm">
          <Oauth42 className="h-4 w-4 cursor-pointer" />
          <span>{t("pages.auth.register.register_with_42")}</span>
        </FlexRow>
      </Link>
    </FlexCol>
  );
};

const PasswordTooltip = () => {
  const { t } = useTranslation();

  return (
    <ul className={styles.passwordTooltip}>
      <li>{t("pages.auth.register.pwd.minimal_length")}</li>
      <li>{t("pages.auth.register.pwd.should_contain_min")}</li>
      <li>{t("pages.auth.register.pwd.should_contain_maj")}</li>
      <li>{t("pages.auth.register.pwd.should_contain_number")}</li>
      <li>{t("pages.auth.register.pwd.should_contain_special")}</li>
    </ul>
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

const LoginLink = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.switchAuthLink}>
      <p>{t("pages.auth.register.already_registered")}</p>
      <Link href="/auth/login">{t("pages.auth.register.login")}</Link>
    </div>
  );
};
