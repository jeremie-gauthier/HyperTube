import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import styles from "./ActiveLink.module.scss";

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
};

function ActiveLink({ children, href }: ActiveLinkProps): JSX.Element {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeLink = classNames({
    [styles.inactive]: !isActive,
    [styles.active]: isActive,
  });

  return (
    <Link href={href}>
      <div className={activeLink}>
        {children}
        <div className={styles.border} />
      </div>
    </Link>
  );
}

export default ActiveLink;
