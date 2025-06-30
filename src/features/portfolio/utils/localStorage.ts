export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error saving key "${key}" to localStorage:`, error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : ({} as T);
  } catch (error) {
    console.warn(`Error loading key "${key}" from localStorage:`, error);
    return {} as T;
  }
};
