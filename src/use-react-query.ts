import { QueryFunction, useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import queryKes from "FROM_YOUR_KEYS";

type Params<Res> = {
  queryKey: keyof typeof queryKes
  fetcher: QueryFunction<any>
  options?: UseQueryOptions<Res>
}

type Output<Res> = UseQueryResult<Res, Error>

export default function useReactQuery<Res>(params: Params<Res>): Output<Res> {
  const { queryKey, fetcher, options } = params
  return useQuery<Res, Error>(queryKey, fetcher, options)
}
