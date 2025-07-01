import { UseQueryResult } from "@tanstack/react-query";

export type ErrorResponse = {
  isError: boolean;
  error: unknown;
  refetch: () => Promise<UseQueryResult<unknown, unknown>>;
};
