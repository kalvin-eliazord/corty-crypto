import { useState } from "react";

export const useLocalStorage = <T>(key: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item =
        typeof window !== "undefined" ? window.localStorage.getItem(key) : null;

      return item ? JSON.parse(item) : ([] as T);
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return [] as T;
    }
  });

  return [storedValue, setStoredValue] as const;
};