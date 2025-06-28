import React, { useEffect, useState } from "react";
import { QueryClientProvider, hydrate } from "@tanstack/react-query";
import queryClient from "@/shared/store/queryClient"; // your QueryClient instance

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (window.__REACT_QUERY_STATE__) {
      hydrate(queryClient, window.__REACT_QUERY_STATE__);
    }
    setIsHydrated(true);
  }, []);

  
  if (!isHydrated) return null;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
