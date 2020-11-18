import React from "react";
import styles from "./Layout.module.scss";

export default function Layout({ children }) {
	return <div className={styles.container}>{children}</div>;
}
