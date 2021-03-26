import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useTranslation } from "react-i18next";
import useForm, { FormErrors } from "@/hooks/useForm";
import FormInput from "@/components/FormInput";
import { RegisterForm } from "@/lib/types/register";
import { FlexCol } from "@/components/Flex";
import resolver from "@/lib/resolvers/register";
import { requiredField } from "@/lib/helpers";
import PerfectScrollbar from "react-perfect-scrollbar";
import { LoginLink, OAuthLinks } from "@/components/Links";
import PasswordTips from "@/components/PasswordTips";
import styles from "./register.module.scss";

const initialState: RegisterForm = {
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
      <PerfectScrollbar className={styles.scrollContainer}>
        <h1 className="title">{t("pages.auth.register.register")}</h1>
        <FormRegister />
        <OAuthLinks />
        <LoginLink />
      </PerfectScrollbar>
    </main>
  );
}

Register.Layout = AuthLayout;
Register.Title = "pages.auth.authentication";
export default Register;

const FormRegister = () => {
  const { t } = useTranslation();
  const submit = (values: RegisterForm) => {
    console.log(values);
    return new Promise<RegisterForm>(() => values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<RegisterForm>(
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
  values: RegisterForm;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors<RegisterForm>;
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
        {isPwdFocused && <PasswordTips className={styles.passwordTooltip} />}
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
