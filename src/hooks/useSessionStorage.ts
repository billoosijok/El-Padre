import { useCallback } from "react";

export const useSessionStorage = () => {
  return {
    get: useCallback((key: string) => {
      return window.sessionStorage.getItem(key);
    }, []),
    set: useCallback((key: string, value: string) => {
      return window.sessionStorage.setItem(key, value);
    }, []),
  };
};
