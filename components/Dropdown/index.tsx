import React from "react";
import classnames from "classnames";
import styles from "./Dropdown.module.scss";
import {
  DropdownDesktop,
  DropdownMobile,
  DropdownProps,
} from "./ResponsiveDropdowns";

function Dropdown({
  title,
  children,
  initialState = false,
  className = "",
}: DropdownProps) {
  return (
    <>
      <DropdownMobile
        title={title}
        initialState={initialState}
        className={className}
      >
        {children}
      </DropdownMobile>
      <DropdownDesktop title={title} className={className}>
        {children}
      </DropdownDesktop>
    </>
  );
}

type DropdownElementProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function Element({ children, ...rest }: DropdownElementProps) {
  const style = classnames({
    [styles.element]: true,
    [rest.className ?? ""]: true,
  });

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}

Dropdown.Element = Element;
export default Dropdown;
