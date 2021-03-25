import React from "react";
import classname from "classnames";
import { FlexRow } from "../Flex";
import styles from "./Label.module.scss";

type LabelProps = React.HTMLAttributes<HTMLDivElement> & {
  text: string;
  isActive: boolean;
};

function Label({ text, isActive, ...rest }: LabelProps) {
  const labelStyle = classname({
    [styles.active]: isActive,
    [styles.inactive]: !isActive,
    [styles.default]: true,
  });

  return (
    <FlexRow className={labelStyle} {...rest}>
      {text}
    </FlexRow>
  );
}

export default Label;
