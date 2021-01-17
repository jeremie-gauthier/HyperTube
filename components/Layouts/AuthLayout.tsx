import { FlexCol } from "@/components/Flex";
import { LangSettings } from "@/components/CountryFlag";
import styles from "./AuthLayout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <FlexCol className={styles.layout} data-testid="layout-div">
      <div className={styles.header}>
        <div className={styles.brandLogo} />
        <LangSettings />
      </div>
      <FlexCol className={styles.container}>{children}</FlexCol>
    </FlexCol>
  );
}
