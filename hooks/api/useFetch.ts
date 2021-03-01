import useSWR, { ConfigInterface, keyInterface } from "swr";
import fetcher from "@/lib/fetcher";

export default function useFetch<Data>(
  key: keyInterface,
  config?: ConfigInterface,
) {
  return useSWR<Data>(key, fetcher, config);
}
