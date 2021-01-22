import { User } from "@/types/user";
import { FlexCol } from "@/components/Flex";
import { getInitials } from "@/lib/helpers";
import styles from "./UserIcon.module.scss";

type UserIconProps = React.HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export default function UserIcon({ user, ...rest }: UserIconProps) {
  return (
    <FlexCol {...rest} className={styles.frame}>
      <span>{getInitials(user)}</span>
    </FlexCol>
  );
}
