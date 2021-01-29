import React from "react";
import fetcher from "@/lib/fetcher";
import { mutate } from "swr";
import useForm, { HookForm } from "@/hooks/useForm";
import { ChangePasswordForm } from "@/lib/types/changePassword";
import resolver from "@/lib/resolvers/changePassword";
import { useTranslation } from "react-i18next";
import { FlexCol } from "@/components/Flex";
import FormInput from "@/components/FormInput";
import SiteLayout from "@/components/Layouts/SiteLayout";
import { requiredField } from "@/lib/helpers";
import PasswordTips from "@/components/PasswordTips";
import styles from "./password.module.scss";

const initialState: ChangePasswordForm = {
  oldPassword: "",
  password: "",
  cpassword: "",
};

function ChangePassword() {
  const { t } = useTranslation();
  const submit = (values: ChangePasswordForm) => {
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
      <h1 className="title">{t("pages.account.security.edit_password")}</h1>
      <FormChangePassword methods={methods} />
    </main>
  );
}

ChangePassword.Layout = SiteLayout;
ChangePassword.Title = "pages.account.my_account";
export default ChangePassword;

export async function getServerSideProps() {
  const user = await fetcher(`http://localhost:3000/api/users/${-42}`, {
    method: "GET",
  });
  return { props: { user } };
}

const FormChangePassword = ({
  methods,
}: {
  methods: HookForm<ChangePasswordForm>;
}) => {
  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit } = methods;
  const [isPwdFocused, setIsPwdFocused] = React.useState(false);

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <FlexCol className={styles.fieldsGroup}>
        <FormInput
          name="oldPassword"
          value={values.oldPassword}
          onChange={handleChange}
          placeholder={t("models.user.old_password")}
          error={errors.oldPassword}
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
          placeholder={t("models.user.cpassword")}
          error={errors.cpassword}
        />
      </FlexCol>
      <button type="submit">{t("common.buttons.submit")}</button>
    </form>
  );
};
