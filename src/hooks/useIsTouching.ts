import { type RefObject, useEffect, useState } from "react";

export const useIsTouching = (
  targetRef: RefObject<HTMLElement>,
  fixedRef: RefObject<HTMLElement>,
) => {
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    const checkIntersection = () => {
      if (!targetRef.current || !fixedRef.current) return;
      const targetRect = targetRef.current.getBoundingClientRect();
      const fixedRect = fixedRef.current.getBoundingClientRect();

      setIsTouching(
        targetRect.top < fixedRect.bottom && targetRect.bottom > fixedRect.top,
      );
    };

    window.addEventListener("scroll", checkIntersection);
    checkIntersection();

    return () => window.removeEventListener("scroll", checkIntersection);
  }, [targetRef, fixedRef]);

  return isTouching;
};
