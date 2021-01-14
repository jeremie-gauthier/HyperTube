import React from "react";
import { FlexCol, FlexRow } from "@/components/Flex";
import classnames from "classnames";
import styles from "./Dropdown.module.scss";

export type DropdownProps = {
  title: React.ReactNode;
  children: React.ReactNode;
} & Partial<DropdownDefaultProps>;

type DropdownDefaultProps = {
  initialState: boolean;
};

export function DropdownMobile({
  title,
  children,
  initialState = false,
}: DropdownProps) {
  const [isVisible, setIsVisible] = React.useState(initialState);
  const arrow = classnames({
    [styles.arrow]: true,
    [styles.down]: isVisible,
  });
  const toggle = React.useCallback(
    () => setIsVisible((isVisible) => !isVisible),
    [],
  );

  return (
    <div className={[styles.container, "mobileView"].join(" ")}>
      <FlexRow role="button" className={styles.header} onClick={toggle}>
        {title}
        <span className={arrow} />
      </FlexRow>
      {isVisible && (
        <FlexCol className={styles.elementsWrapper}>{children}</FlexCol>
      )}
    </div>
  );
}

export function DropdownDesktop({ title, children }: DropdownProps) {
  return (
    <div className={[styles.container, "desktopView"].join(" ")}>
      <FlexRow className={styles.header}>{title}</FlexRow>
      <FlexCol className={styles.elementsWrapper}>{children}</FlexCol>
    </div>
  );
}
