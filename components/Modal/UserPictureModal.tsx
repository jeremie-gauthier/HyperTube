import React from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { User } from "@/types/user";
import { usePatchMe } from "@/hooks/api/useUser";
import { FlexRow } from "../Flex";
import { ReactComponent as Cross } from "../../public/icons/cross.svg";
import styles from "./UserPictureModal.module.scss";

type UserPictureModalProps = {
  user: User;
  close: () => void;
};

export default function UserPictureModal({
  user,
  close,
}: UserPictureModalProps) {
  const { t } = useTranslation();

  return (
    <Modal close={close} className={styles.container}>
      <FlexRow className={styles.header}>
        <h2>{t("pages.account.profile.edit_profile_picture")}</h2>
        <Cross onClick={close} />
      </FlexRow>

      <FlexRow className={styles.pictures}>
        <Image
          src={`/img/avatar/avatar${user.picture}.png`}
          alt="Current profile picture"
          width={200}
          height={200}
          quality={100}
          key={user.picture}
        />
        <Miniatures user={user} />
      </FlexRow>
    </Modal>
  );
}

const Miniatures = ({ user }: { user: User }) => {
  const patchMe = usePatchMe();
  const images = Array.from({ length: 8 }, (_, idx) => idx + 1);

  const handleChange = (id: number) => patchMe({ picture: id });

  const randomPicture = (currentId: number) => {
    const newId = Math.floor(Math.random() * 8 + 1);
    if (newId === currentId) handleChange((newId % 8) + 1);
    else handleChange(newId);
  };

  return user ? (
    <FlexRow className={styles.miniatures}>
      {images.map(
        (id) =>
          id !== user.picture && (
            <div key={id} className={styles.miniature}>
              <Image
                src={`/img/avatar/avatar${id}.png`}
                alt="Another profile picture"
                width={75}
                height={75}
                quality={100}
                className={styles.miniature}
                onClick={() => handleChange(id)}
              />
            </div>
          ),
      )}
      <div className={styles.miniature}>
        <button
          type="submit"
          className={styles.randomMiniature}
          onClick={() => randomPicture(user.picture)}
        >
          ?
        </button>
      </div>
    </FlexRow>
  ) : null;
};
