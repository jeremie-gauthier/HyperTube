import React from "react";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
