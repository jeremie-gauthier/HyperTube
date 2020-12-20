import { FlexCol } from "../Flex";
import styles from "./AuthLayout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <FlexCol className={styles.layout} data-testid="layout-div">
      <div className={styles.brandLogo} />
      <FlexCol className={styles.container}>{children}</FlexCol>
    </FlexCol>
  );
}
