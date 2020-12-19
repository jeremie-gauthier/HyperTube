import { TUser } from "@/data/models/User";
import { FlexCol } from "@/components/Flex";
import { getInitials } from "@/lib/helpers";
import styles from "./UserIcon.module.scss";

type UserIconProps = {
  user: TUser;
};

export default function UserIcon({
  user,
  ...rest
}: UserIconProps): JSX.Element {
  return (
    <FlexCol className={styles.frame} {...rest}>
      <span>{getInitials(user)}</span>
    </FlexCol>
  );
}
