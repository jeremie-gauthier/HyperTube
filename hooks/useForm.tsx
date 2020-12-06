import React from "react";

type FormCallback<V> = (values: V) => void;
type FormResolver<V> = (values: V) => FormErrors<V>;
export type FormErrors<V> = {
  [P in keyof V]?: string;
};

type HookForm<V> = {
  values: V;
  errors: FormErrors<V>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
};

export default function useForm<V>(
  callback: FormCallback<V>,
  resolver: FormResolver<V>,
  initialValues: V,
): HookForm<V> {
  const [values, setValues] = React.useState<V>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors<V>>({});
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [hasSubmittingOnce, setHasSubmittingOnce] = React.useState<boolean>(
    false,
  );

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (values) {
      evt.persist();
      setIsSubmitting(false);
      setValues((oldValues) => ({
        ...oldValues,
        [evt.target.name]:
          evt.target.type === "checkbox"
            ? evt.target.checked
            : evt.target.value,
      }));
    }
  };

  React.useEffect(() => {
    if (hasSubmittingOnce) {
      setErrors(resolver(values));
    }
  }, [resolver, hasSubmittingOnce, values]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setErrors(resolver(values));
    setIsSubmitting(true);
    setHasSubmittingOnce(true);
  };

  React.useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback(values);
    }
  }, [callback, isSubmitting, errors, values]);

  return { values, errors, handleChange, handleSubmit };
}
