import FormInput from "@/components/FormInput";
import AuthLayout from "@/components/Layouts/AuthLayout";
import useForm from "@/hooks/useForm";
import { TResetForm } from "@/lib/types/reset";
import React from "react";
import { useTranslation } from "react-i18next";
import PerfectScrollbar from "react-perfect-scrollbar";
import resolver from "@/lib/resolvers/reset";
import { LoginLink, SignupLink } from "@/components/Links";
import styles from "./reset.module.scss";

const initialState: TResetForm = {
  email: "",
};

function Reset() {
  const { t } = useTranslation();

  return (
    <main className={styles.container}>
      <PerfectScrollbar className={styles.scrollContainer}>
        <h1>{t("pages.auth.reset.forgotten_password")}</h1>
        <ResetForm />
        <div className={styles.authLinksGroup}>
          <SignupLink />
          <LoginLink />
        </div>
      </PerfectScrollbar>
    </main>
  );
}

Reset.Layout = AuthLayout;
export default Reset;

const ResetForm = () => {
  const { t } = useTranslation();
  const submit = (values: TResetForm) => {
    console.log(values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<TResetForm>(
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
