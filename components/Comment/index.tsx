import { useMe } from "@/hooks/api/useUser";
import { CommentsForMovie, UserCommentsOnMovies } from "@/types/comment";
import { User } from "@/types/user";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDeleteComment } from "@/hooks/api/useComments";
import { FlexRow } from "../Flex";
import { ReactComponent as CrossIcon } from "../../public/icons/cross.svg";
import styles from "./Comment.module.scss";
import ConfirmationModal from "../Modal/ConfirmationModal";
import { toast, toastError, toastInfo } from "../Toast";

type CommentProps = {
  userCommentOnMovie: UserCommentsOnMovies;
};

const Comment = ({
  userCommentOnMovie: { user, comment, movie },
}: CommentProps) => (
  <div className={styles.container}>
    <Header title={movie.title} date={comment.date} />
    <p>
      <Author username={user.username} />
    </p>
    <UserComment comment={comment.comment} />
  </div>
);
export default Comment;

export const MovieComment = ({
  userComment: { user, comment },
}: {
  userComment: CommentsForMovie;
}) => {
  const { t } = useTranslation();
  const { data: me } = useMe();
  const deleteComment = useDeleteComment();
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false,
  );
  const [canShow, setCanShow] = React.useState(true);
  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      toastInfo(
        t("components.comment.delete_success"),
        toast.POSITION.BOTTOM_RIGHT,
      );
      setCanShow(false);
    } catch (error) {
      toastError(t("common.errors.error_occured"));
    }
  };

  return canShow ? (
    <div className={styles.container}>
      {me?.id === user.id && (
        <button
          type="button"
          className={styles.delIcon}
          onClick={() => setShowConfirmationModal(true)}
        >
          <CrossIcon />
        </button>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          title={t("components.comment.delete")}
          text={t("components.comment.confirm_delete")}
          callback={handleDelete}
          close={() => setShowConfirmationModal(false)}
        />
      )}
      <Header title={<AuthorLink user={user} />} date={comment.date} />
      <UserComment comment={comment.comment} />
    </div>
  ) : null;
};

const Author = ({ username }: { username: string }) => {
  const { t } = useTranslation();

  return (
    <>
      {username} {t("components.comment.wrote")}:
    </>
  );
};

const AuthorLink = ({ user }: { user: User }) => (
  <Link href={`/users/${user.id}`}>
    <a href={`/users/${user.id}`}>
      <Author username={user.username} />
    </a>
  </Link>
);

const Header = ({
  title,
  date,
}: {
  title: string | JSX.Element;
  date: string;
}) => (
  <FlexRow className={styles.header}>
    <h3>{title}</h3>
    <p>{date}</p>
  </FlexRow>
);

const UserComment = ({ comment }: { comment: string }) => <p>{comment}</p>;
