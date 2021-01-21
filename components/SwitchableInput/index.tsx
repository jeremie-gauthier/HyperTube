/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { HookForm } from "@/hooks/useForm";
import Spinner from "@/components/Spinner";
import isEmpty from "@ramda/isempty";
import FormInput from "../FormInput";

type ComponentContext = {
  isEditable: boolean;
  toggle: () => void;
};

const SwitchableInputContext = React.createContext({} as ComponentContext);

type SwitchableInputProps = {
  children: React.ReactNode;
};
function SwitchableInput({ children }: SwitchableInputProps) {
  const [isEditable, setIsEditable] = React.useState(false);
  const toggle = React.useCallback(
    () => setIsEditable((isEditable) => !isEditable),
    [],
  );
  const ctx = React.useMemo(() => ({ isEditable, toggle }), [isEditable]);

  return (
    <SwitchableInputContext.Provider value={ctx}>
      {children}
    </SwitchableInputContext.Provider>
  );
}

type InputProps = {
  name: string;
  placeholder: string;
  methods: HookForm<Record<string, string | (string & readonly string[])>>;
} & Partial<InputDefaultProps>;

type InputDefaultProps = {
  className: string;
};

// Should be uncontrolled form
// Must create Hook for uncontrolled form before
function Input({
  name,
  methods: { values, errors, handleChange },
  placeholder,
  className = "",
}: InputProps) {
  const { isEditable } = React.useContext(SwitchableInputContext);

  return (
    <div className={className}>
      {isEditable ? (
        <FormInput
          name={name}
          placeholder={placeholder}
          value={values[name]}
          error={errors[name]}
          onChange={handleChange}
        />
      ) : (
        <div>{values[name]}</div>
      )}
    </div>
  );
}

type ToggleProps = {
  label: React.ReactNode;
  isLoading: boolean;
  methods: HookForm<Record<string, string | (string & readonly string[])>>;
} & Partial<ToggleDefaultProps>;

type ToggleDefaultProps = {
  className?: string;
};

function Toggle({ label, isLoading, methods, className = "" }: ToggleProps) {
  const { isEditable, toggle } = React.useContext(SwitchableInputContext);
  const [hasSubmit, setHasSubmit] = React.useState(false);

  const onCancel = () => {
    toggle();
    methods.handleCancel();
  };

  const onSubmit = (evt: React.FormEvent) => {
    methods.handleSubmit(evt as React.FormEvent<HTMLFormElement>);
    setHasSubmit(true);
  };

  React.useEffect(() => {
    if (hasSubmit) {
      if (isEmpty(methods.errors)) {
        toggle();
      }
      setHasSubmit(false);
    }
  }, [hasSubmit]);

  return (
    <div className={className}>
      {isEditable ? (
        <>
          <button type="button" onClick={onCancel} disabled={isLoading}>
            Cancel
          </button>
          {isLoading ? (
            <Spinner className="text-blue-500" />
          ) : (
            <button type="submit" onClick={onSubmit}>
              Submit
            </button>
          )}
        </>
      ) : (
        <button type="button" onClick={toggle}>
          {label}
        </button>
      )}
    </div>
  );
}

SwitchableInput.Toggle = Toggle;
SwitchableInput.Input = Input;
export default SwitchableInput;
