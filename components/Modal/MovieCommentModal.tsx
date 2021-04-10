import React from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";
import { Movie } from "@/types/movie";
import isEmpty from "@ramda/isempty";
import { fetcherPOST } from "@/lib/fetcher";
import { moviesRoute } from "@/hooks/api/useMovie";
import { UserCommentsOnMovies, Comment } from "@/types/comment";
import pipe from "@ramda/pipe";
import { useMe } from "@/hooks/api/useUser";
import { User } from "@/types/user";
import { FlexCol, FlexRow } from "../Flex";
import { ReactComponent as Cross } from "../../public/icons/cross.svg";
import styles from "./MovieCommentModal.module.scss";
import { toast, toastError, toastInfo } from "../Toast";

type MovieCommentModalProps = {
  movie: Movie;
  close: () => void;
  addComment: (comment: UserCommentsOnMovies) => void;
};

export default function MovieCommentModal({
  movie,
  close,
  addComment,
}: MovieCommentModalProps) {
  const { t } = useTranslation();
  const [comment, setComment] = React.useState("");
  const { data: me } = useMe();

  const handleSubmitComment = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formattedComment = comment.trim();

    if (isEmpty(formattedComment)) {
      toastError(t("pages.movies.details.post_empty_comment"));
      return;
    }

    try {
      const newComment = await fetcherPOST<Comment>(
        `${moviesRoute(movie.id)}/comments`,
        { comment: formattedComment },
      );
      pipe(
        () =>
          toastInfo(
            t("pages.movies.details.post_comment_successfully"),
            toast.POSITION.BOTTOM_RIGHT,
          ),
        () =>
          addComment({ comment: newComment, user: me ?? ({} as User), movie }),
        close,
      )();
    } catch (error) {
      toastError(t("common.errors.error_occured"), toast.POSITION.BOTTOM_RIGHT);
    }
  };

  return (
    <Modal close={close} className={styles.container}>
      <ModalHeader close={close} />
      <ModalBody
        comment={comment}
        onChange={(evt) => setComment(evt.target.value)}
        close={close}
        onSubmit={handleSubmitComment}
      />
    </Modal>
  );
}

const ModalHeader = ({ close }: { close: () => void }) => {
  const { t } = useTranslation();

  return (
    <FlexRow className={styles.header}>
      <h2>{t("pages.movies.details.add_comment")}</h2>
      <Cross onClick={close} />
    </FlexRow>
  );
};

const ModalBody = ({
  comment,
  onChange,
  close,
  onSubmit,
}: {
  comment: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  close: () => void;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <FlexCol className={styles.body}>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder={t("pages.movies.details.type_your_comment")}
          value={comment}
          onChange={onChange}
          rows={7}
        />
        <FlexRow className={styles.buttons}>
          <CancelBtn onClick={close} />
          <SubmitBtn disabled={isEmpty(comment.trim())} />
        </FlexRow>
      </form>
    </FlexCol>
  );
};

const SubmitBtn = ({ disabled }: { disabled: boolean }) => {
  const { t } = useTranslation();

  return (
    <button type="submit" className={styles.submit} disabled={disabled}>
      {t("common.buttons.submit")}
    </button>
  );
};

const CancelBtn = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();

  return (
    <button type="button" className={styles.cancel} onClick={onClick}>
      {t("common.buttons.cancel")}
    </button>
  );
};
