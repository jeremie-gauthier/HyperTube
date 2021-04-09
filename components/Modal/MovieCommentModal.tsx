import React from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "react-i18next";
import { Movie } from "@/types/movie";
import isEmpty from "@ramda/isempty";
import fetcher from "@/lib/fetcher";
import { moviesRoute } from "@/hooks/api/useMovie";
import { Methods } from "@/types/requests";
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

// eslint-disable-next-line max-lines-per-function
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
      const newComment = await fetcher<Comment>(
        `${moviesRoute(movie.id)}/comments`,
        {
          method: Methods.POST,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: formattedComment }),
        },
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
      <FlexRow className={styles.header}>
        <h2>{t("pages.movies.details.add_comment")}</h2>
        <Cross onClick={close} />
      </FlexRow>

      <FlexCol className={styles.body}>
        <form onSubmit={handleSubmitComment}>
          <textarea
            placeholder={t("pages.movies.details.type_your_comment")}
            value={comment}
            onChange={(evt) => setComment(evt.target.value)}
            rows={7}
          />
          <FlexRow className={styles.buttons}>
            <button type="button" className={styles.cancel} onClick={close}>
              {t("common.buttons.cancel")}
            </button>
            <button type="submit" className={styles.submit}>
              {t("common.buttons.submit")}
            </button>
          </FlexRow>
        </form>
      </FlexCol>
    </Modal>
  );
}
