import { useQuery, UseQueryResult } from "@tanstack/react-query";

type SmartQueryOptions<TData> = {
  queryKey: unknown[];
  queryFn: () => Promise<TData>;
  enabled?: boolean;
};

export function useSmartQuery<TData>({
  queryKey,
  queryFn,
  enabled,
}: SmartQueryOptions<TData>): UseQueryResult<TData, unknown> {
  return useQuery<TData, unknown>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn,
    ...(enabled !== undefined ? { enabled } : {}),
  });
}
