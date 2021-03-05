import { ConfigInterface, responseInterface, useSWRInfinite } from "swr";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";
import { Comment, UserCommentsOnMovies } from "@/types/comment";
import { usersRoute } from "./useUser";

export type CommentsRange = {
  start: number;
  end: number;
};

export const commentsRoute = ({ start, end }: CommentsRange) =>
  `/comments?range=${start}:${end}`;

type CommentsSWR = Pick<responseInterface<Comment[], Error>, "error"> & {
  comments: UserCommentsOnMovies[];
  isLoadingMoreComments: boolean;
  loadMoreComments: () => void;
};

export default function useComments(
  chunkSize: number,
  config?: ConfigInterface,
): CommentsSWR {
  const {
    query: { id },
  } = useRouter();

  const { data, error, setSize, size } = useSWRInfinite<UserCommentsOnMovies[]>(
    (index) => {
      const start = index * chunkSize;
      const end = start + chunkSize;
      return `${usersRoute(id as string)}${commentsRoute({
        start,
        end,
      })}`;
    },
    fetcher,
    config,
  );

  const isLoadingInitialData = !data && !error;

  const isLoadingMoreComments =
    (isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === "undefined")) ??
    false;

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < chunkSize);

  const loadMoreComments = () => {
    if (!(isLoadingMoreComments || isReachingEnd)) {
      setSize((size) => size + 1);
    }
  };

  return {
    comments: (data?.flat() as UserCommentsOnMovies[]) ?? [],
    isLoadingMoreComments,
    error,
    loadMoreComments,
  };
}
