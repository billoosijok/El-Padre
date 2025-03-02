import { useCallback } from "react";

export const useLocalStorage = () => {
  return {
    get: useCallback((key: string) => {
      return window.localStorage.getItem(key);
    }, []),
    set: useCallback((key: string, value: string) => {
      return window.localStorage.setItem(key, value);
    }, []),
  };
};
