/* eslint-disable react-hooks/exhaustive-deps */
import { HookForm } from "@/hooks/useForm";
import { AccountForm } from "@/lib/types/account";
import React from "react";
import Spinner from "@/components/Spinner";
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
  name: keyof AccountForm;
  placeholder: string;
  methods: HookForm<AccountForm>;
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
} & Partial<ToggleDefaultProps>;

type ToggleDefaultProps = {
  className?: string;
};

function Toggle({ label, isLoading, className = "" }: ToggleProps) {
  const { isEditable, toggle } = React.useContext(SwitchableInputContext);

  return (
    <div className={className}>
      {isEditable ? (
        <>
          <button type="button" onClick={toggle} disabled={isLoading}>
            Cancel
          </button>
          {isLoading ? (
            <Spinner className="text-blue-500" />
          ) : (
            <button type="submit">Submit</button>
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
