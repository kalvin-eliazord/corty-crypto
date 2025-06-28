import { useEffect } from "react";

export const useDebounceCoin = (
  searchCoinInput: string,
  setCoinSearched: (searchCoinInput: string) => void
) => {
  useEffect(() => {
    if (!searchCoinInput || !searchCoinInput.trim()) return;

    const timeId = setTimeout(() => {
      setCoinSearched(searchCoinInput);
    }, 300);

    return () => clearTimeout(timeId);
  }, [searchCoinInput, setCoinSearched]);
};