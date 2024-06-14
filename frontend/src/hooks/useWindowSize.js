import { useState, useEffect } from 'react';

const useWindowSize = (mobileBreakpoint, tabletBreakpoint) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [view, setView] = useState(
    width < mobileBreakpoint ? "mobile"
    : width < tabletBreakpoint ? "tablet" : "desktop"
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    setView(
      width < mobileBreakpoint ? "mobile"
      : width < tabletBreakpoint ? "tablet" : "desktop"
    );

    return () => window.removeEventListener("resize", handleResize);
  }, [width, mobileBreakpoint, tabletBreakpoint]);

  return view;
};

export default useWindowSize;
