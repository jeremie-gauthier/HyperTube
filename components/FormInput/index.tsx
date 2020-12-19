import React from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./FormInput.module.scss";

type FormInputProps = {
  value: string;
  name: string;
  placeholder: string;
} & Partial<DefaultProps>;

type DefaultProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className: string;
  error: string;
};

export default function FormInput({
  className = "",
  error = undefined,
  ...rest
}: FormInputProps): JSX.Element {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false);
  const hasValue = rest.value.length > 0;
  const showLabel = hasFocus || hasValue;
  const { t } = useTranslation();

  const isFocused = classnames({
    [className]: true,
    "border-white": hasFocus,
    "border-grey-light": !hasFocus,
    [styles.inputError]: error,
  });
  const labelStyle = classnames({
    "text-white": hasFocus,
    "text-grey-light": !hasFocus,
  });

  return (
    <div className={styles.container}>
      {showLabel && (
        <label htmlFor={rest.name} className={labelStyle}>
          {rest.placeholder}
        </label>
      )}
      <input
        id={rest.name}
        {...rest}
        className={isFocused}
        placeholder={showLabel ? "" : rest.placeholder}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        autoComplete="off"
      />
      {error && <p>{t(error)}</p>}
    </div>
  );
}
