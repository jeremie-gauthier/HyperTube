import React from "react";
import { mutate } from "swr";
import useForm, { HookForm } from "@/hooks/useForm";
import { ChangeEmailForm } from "@/lib/types/changeEmail";
import resolver from "@/lib/resolvers/changeEmail";
import { useTranslation } from "react-i18next";
import { FlexCol } from "@/components/Flex";
import FormInput from "@/components/FormInput";
import SiteLayout from "@/components/Layouts/SiteLayout";
import { requiredField } from "@/lib/helpers";
import Link from "next/link";
import styles from "./change.module.scss";

const initialState: ChangeEmailForm = {
  password: "",
  email: "",
};

function ChangeEmail() {
  const { t } = useTranslation();
  const submit = (values: ChangeEmailForm) => {
    console.log(values);

    // mutate(
    //   `/api/users/${-42}`,
    //   async () => {
    //     const newUser = await fetcher(`/api/users/${-42}`, {
    //       method: "PATCH",
    //       body: JSON.stringify(values),
    //     });
    //     return newUser;
    //   },
    //   false,
    // );
  };
  const methods = useForm(submit, resolver, initialState);

  return (
    <main className={styles.container}>
      <h1 className="title">{t("pages.account.security.edit_email")}</h1>
      <FormChangeEmail methods={methods} />
      <Link href="/account">{t("pages.account.back_to_account")}</Link>
    </main>
  );
}

ChangeEmail.Layout = SiteLayout;
ChangeEmail.Title = "pages.account.my_account";
export default ChangeEmail;

const FormChangeEmail = ({
  methods,
}: {
  methods: HookForm<ChangeEmailForm>;
}) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <FlexCol className={styles.fieldsGroup}>
        <FormInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder={requiredField(t("models.user.password"))}
          error={errors.password}
        />
        <FormInput
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder={requiredField(t("models.user.email"))}
          error={errors.email}
        />
        <button type="submit">{t("common.buttons.submit")}</button>
      </FlexCol>
    </form>
  );
};
