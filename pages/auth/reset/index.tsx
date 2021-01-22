import FormInput from "@/components/FormInput";
import AuthLayout from "@/components/Layouts/AuthLayout";
import useForm from "@/hooks/useForm";
import { ResetForm } from "@/lib/types/reset";
import React from "react";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import resolver from "@/lib/resolvers/reset";
import { LoginLink, SignupLink } from "@/components/Links";
import styles from "./reset.module.scss";

const initialState: ResetForm = {
  email: "",
};

function Reset() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <PerfectScrollbar className={styles.scrollContainer}>
        <h1 className="title">{t("pages.auth.reset.forgotten_password")}</h1>
        <FormReset />
        <div className={styles.authLinksGroup}>
          <SignupLink />
          <LoginLink />
        </div>
      </PerfectScrollbar>
    </main>
  );
}

Reset.Layout = AuthLayout;
Reset.Title = "pages.auth.authentication";
export default Reset;

const FormReset = () => {
  const { t } = useTranslation();
  const submit = (values: ResetForm) => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ResetForm>(
    submit,
    resolver,
    initialState,
  );

  return (
    <form onSubmit={handleSubmit} className={`${styles.authForm} mt-4`}>
      <FormInput
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        placeholder={t("pages.auth.reset.associated_email")}
      />
      <button type="submit">{t("common.buttons.submit")}</button>
    </form>
  );
};
