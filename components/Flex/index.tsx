import React from "react";
import styles from "./Flex.module.scss";

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
} & Partial<DefaultProps>;

type DefaultProps = {
  className: string;
};

export const FlexCol = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className = "", ...rest }, forwardRef) => (
    <div
      ref={forwardRef}
      className={[styles.flexCol, className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  ),
);

export const FlexRow = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className = "", ...rest }, forwardRef) => (
    <div
      ref={forwardRef}
      className={[styles.flexRow, className].join(" ")}
      {...rest}
    >
      {children}
    </div>
  ),
);
