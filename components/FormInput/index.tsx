import React from "react";
import classnames from "classnames";
import { useTranslation } from "react-i18next";
import styles from "./FormInput.module.scss";

export type FormInputProps = {
  value: string;
  name: string;
  placeholder: string;
} & Partial<DefaultProps>;

type DefaultProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error: string;
};

export default function FormInput({
  error = undefined,
  ...rest
}: FormInputProps) {
  const { hasFocus, handleFocus, handleBlur } = useFocus(
    rest.onFocus,
    rest.onBlur,
  );
  const hasValue = rest.value.length > 0;
  const showLabel = hasFocus || hasValue;
  const { t } = useTranslation();

  const isFocused = classnames({
    [rest.className ?? ""]: true,
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
        onBlur={handleBlur}
        onFocus={handleFocus}
        autoComplete="off"
      />
      {error && <p>{t(error)}</p>}
    </div>
  );
}

type FocusEvent =
  | ((evt: React.FocusEvent<HTMLInputElement>) => void)
  | undefined;

const useFocus = (onFocus: FocusEvent, onBlur: FocusEvent) => {
  const [hasFocus, setHasFocus] = React.useState(false);

  const handleFocus = React.useCallback(
    (evt) => {
      setHasFocus(true);
      if (onFocus) {
        onFocus(evt);
      }
    },
    [onFocus],
  );

  const handleBlur = React.useCallback(
    (evt) => {
      setHasFocus(false);
      if (onBlur) {
        onBlur(evt);
      }
    },
    [onBlur],
  );

  return { hasFocus, handleFocus, handleBlur };
};
