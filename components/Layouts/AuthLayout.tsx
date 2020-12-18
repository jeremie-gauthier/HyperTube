import { useResponsiveAttribute } from "@/hooks/useSelector";
import Image from "next/image";
import { FlexCol } from "../Flex";
import styles from "./AuthLayout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const isTabletOrMobile = useResponsiveAttribute();

  return isTabletOrMobile ? (
    <MobileView>{children}</MobileView>
  ) : (
    <DesktopView>{children}</DesktopView>
  );
}

const MobileView = ({ children }: LayoutProps) => (
  <FlexCol className={styles.layoutMobile}>
    <div className="mt-4 ml-3">
      <Image
        layout="intrinsic"
        height={32}
        width={118}
        src="/icons/hypertube.png"
        alt="Hypertube logo"
        priority
      />
    </div>
    {children}
  </FlexCol>
);

const DesktopView = ({ children }: LayoutProps) => (
  <FlexCol className={styles.layoutDesktop} data-testid="layout-div">
    <Image
      layout="fill"
      src="/img/landing.jpg"
      alt="Movies"
      priority
      quality={100}
    />
    <div className={styles.brandLogo}>
      <Image
        layout="intrinsic"
        height={54}
        width={200}
        src="/icons/hypertube.png"
        alt="Hypertube logo"
        priority
      />
    </div>
    <FlexCol className={styles.container}>{children}</FlexCol>
  </FlexCol>
);
