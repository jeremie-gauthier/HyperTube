import { User } from "@/types/user";
import { FlexCol } from "@/components/Flex";
import Image from "next/image";
import styles from "./UserIcon.module.scss";

type UserIconProps = React.HTMLAttributes<HTMLDivElement> & {
  user: User;
};

export default function UserIcon({ user, ...rest }: UserIconProps) {
  const { picture } = user;

  return (
    <FlexCol {...rest} className={styles.frame}>
      {picture && (
        <Image
          src={`/img/avatar/avatar${user.picture}.png`}
          alt="Current profile picture"
          width={32}
          height={32}
          quality={100}
          key={user.picture}
        />
      )}
    </FlexCol>
  );
}
