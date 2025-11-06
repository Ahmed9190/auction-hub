import { useEffect, useState } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.tablet) setBreakpoint('mobile');
      else if (width < breakpoints.desktop) setBreakpoint('tablet');
      else if (width < breakpoints.wide) setBreakpoint('desktop');
      else setBreakpoint('wide');
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
    isWide: breakpoint === 'wide',
  };
};