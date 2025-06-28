import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UseQueryResult } from "@tanstack/react-query";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

type AlertErrorProps<TData, TError> = {
  errorName: string;
  networkError: TError;
  refetch: () => Promise<UseQueryResult<TData, TError>>;
};

export const AlertError = <TData, TError>({
  errorName,
  networkError,
  refetch,
}: AlertErrorProps<TData, TError>) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev < 1) {
          clearInterval(intervalRef);
          refetch();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef);
  }, [refetch]);

  return (
    <Alert
      variant="destructive"
      className={`fixed bottom-4 max-w-sm right-4 z-50 opacity-95 ${
        !timeLeft && "hover:cursor-pointer"
      }`}
    >
      <AlertCircleIcon />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AlertTitle>{(networkError as any)?.message ?? "Error"}</AlertTitle>
      <AlertDescription>
        <p>
          {errorName} will refetch in {timeLeft} seconds.
        </p>
      </AlertDescription>
    </Alert>
  );
};