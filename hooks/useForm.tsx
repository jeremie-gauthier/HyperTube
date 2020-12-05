import React from "react";

type FormCallback = () => void;
type FormResolver<V> = (values: V) => FormErrors<V>;
type FormErrors<V> = { [P in keyof V]?: string };

type HookForm<V> = {
  values: V;
  errors: FormErrors<V>;
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (evt: React.FormEvent<HTMLButtonElement>) => void;
};

export default function useForm<V>(
  callback: FormCallback,
  resolver: FormResolver<V>,
  initialValues: V,
): HookForm<V> {
  const [values, setValues] = React.useState<V>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors<V>>({});
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  console.log(values, errors);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (values) {
      evt.persist();
      setValues((oldValues) => ({
        ...oldValues,
        [evt.target.name]: evt.target.value,
      }));
    }
  };

  React.useEffect(() => {
    if (isSubmitting) {
      setErrors(resolver(values));
    }
  }, [resolver, isSubmitting, values]);

  const handleSubmit = (evt: React.FormEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    setErrors(resolver(values));
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback();
    }
  }, [callback, isSubmitting, errors]);

  return { values, errors, handleChange, handleSubmit };
}
