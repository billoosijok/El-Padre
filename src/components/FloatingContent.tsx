import { PropsWithChildren } from "react";

import "./FloatingContent.css";

export const FloatingContent = ({
  children,
  // maxClip = 10,
}: PropsWithChildren<{ maxClip?: number }>) => {
  // const scrollAnimation = useSpringValue(0);

  // const contentStyles = CLIPPING_ENABLED
  //   ? {
  //       clipPath: scrollAnimation.to(
  //         (val) =>
  //           `inset(0% ${maxClip - val}% 0% ${maxClip - val}% round 10px)`,
  //       ),
  //     }
  //   : undefined;

  // useLayoutEffect(() => {
  //   const onScroll = () => {
  //     const scrollY = Math.min(window.scrollY, 100);
  //     const transitionValue = scrollY / maxClip;

  //     scrollAnimation.set(transitionValue);
  //   };

  //   if (CLIPPING_ENABLED) {
  //     window.addEventListener("scroll", onScroll);

  //     return () => window.removeEventListener("scroll", onScroll);
  //   }
  // }, []);

  return <div className="floating-content">{children}</div>;
};
