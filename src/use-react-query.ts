import { QueryFunction, useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import queryKes from "FROM_YOUR_KEYS";

// R stands for the response type (Result)
type QueryPayload<R> = [
  queryKey: keyof typeof queryKes,
  fetchData: QueryFunction<any>,
  options?: UseQueryOptions<R>
];

export default function useReactQuery<R>(...payload: QueryPayload<R>): UseQueryResult<R, Error> {
  const [queryKey, fetchData, options] = payload;

  return useQuery<R, Error>(queryKey, fetchData, {
    staleTime: 31_556_952_000, // cache time
    retry: false,
    ...options,
  });
}
