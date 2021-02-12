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
  className: string;
};

export function DropdownMobile({
  title,
  children,
  initialState = false,
  className = "",
}: DropdownProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => setIsVisible(initialState), [initialState]);

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
        <FlexCol className={[styles.elementsWrapper, className].join(" ")}>
          {children}
        </FlexCol>
      )}
    </div>
  );
}

export function DropdownDesktop({
  title,
  children,
  className = "",
}: DropdownProps) {
  return (
    <div className={[styles.container, "desktopView"].join(" ")}>
      <FlexRow className={styles.header}>{title}</FlexRow>
      <FlexCol className={[styles.elementsWrapper, className].join(" ")}>
        {children}
      </FlexCol>
    </div>
  );
}
