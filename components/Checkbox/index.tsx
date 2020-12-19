import { FlexRow } from "@/components/Flex";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  label: string;
  name: string;
} & Partial<React.InputHTMLAttributes<HTMLInputElement>>;

export default function Checkbox({
  label,
  ...rest
}: CheckboxProps): JSX.Element {
  return (
    <FlexRow className={styles.container}>
      <input type="checkbox" {...rest} />
      <label htmlFor={rest.name}>{label}</label>
    </FlexRow>
  );
}
