import useSWR, { ConfigInterface } from "swr";
import fetcher from "@/lib/fetcher";
import { BaseSWR } from "@/types/requests";

type CommentsSWR = BaseSWR<Comment[]> & {
  comments: Comment[];
};

export default function useComments(
  id: number,
  config?: ConfigInterface,
): CommentsSWR {
  const { data, error, isValidating, ...rest } = useSWR(
    `/api/users/${id}/comments`,
    fetcher,
    config,
  );

  return {
    comments: data ?? ([] as Comment[]),
    isLoading: isValidating,
    isError: error,
    ...rest,
  };
}
