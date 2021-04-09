import React from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";
import pipe from "@ramda/pipe";
import { FlexCol, FlexRow } from "../Flex";
import { ReactComponent as Cross } from "../../public/icons/cross.svg";
import styles from "./MovieCommentModal.module.scss"; // same style

type ConfirmationModalProps = {
  title: string;
  text: string;
  callback: () => void;
  close: () => void;
};

export default function ConfirmationModal({
  title,
  text,
  callback,
  close,
}: ConfirmationModalProps) {
  const { t } = useTranslation();

  return (
    <Modal close={close} className={styles.container}>
      <FlexRow className={styles.header}>
        <h2>{title}</h2>
        <Cross onClick={close} />
      </FlexRow>

      <FlexCol className={styles.body}>
        <p>{text}</p>
        <FlexRow className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={close}>
            {t("common.buttons.cancel")}
          </button>
          <button
            type="button"
            className={styles.submit}
            onClick={pipe(callback, close)}
          >
            {t("common.buttons.confirm")}
          </button>
        </FlexRow>
      </FlexCol>
    </Modal>
  );
}
