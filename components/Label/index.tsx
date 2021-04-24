import React from "react";
import classname from "classnames";
import { FlexRow } from "../Flex";
import styles from "./Label.module.scss";

type LabelProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  isActive: boolean;
  Icon?: React.ReactNode | null;
};

function Label({ text, isActive, Icon, ...rest }: LabelProps) {
  const labelStyle = classname({
    [styles.active]: isActive,
    [styles.inactive]: !isActive,
    [styles.default]: true,
  });

  return (
    <FlexRow className={labelStyle} {...rest}>
      <p>{text}</p>
      {Icon && <div>{Icon}</div>}
    </FlexRow>
  );
}

Label.defaultProps = {
  Icon: null,
};

export default Label;
