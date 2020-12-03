import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";
import styles from "./ActiveLink.module.scss";

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
} & Partial<DefaultProps>;

type DefaultProps = {
  className: string;
  inactiveClassName: string;
  activeClassName: string;
};

function ActiveLink({
  children,
  href,
  className = "",
  inactiveClassName = "",
  activeClassName = "",
  ...rest
}: ActiveLinkProps): JSX.Element {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeLink = classNames({
    [className]: true,
    [`${styles.inactive} ${inactiveClassName}`]: !isActive,
    [`${styles.active} ${activeClassName}`]: isActive,
  });

  return (
    <Link href={href}>
      <a className={activeLink} {...rest}>
        {children}
      </a>
    </Link>
  );
}

export default ActiveLink;
