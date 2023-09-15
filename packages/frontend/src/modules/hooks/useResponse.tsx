import { useMediaQuery } from 'react-responsive';

export const useResponce = () => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return {
    isDesktop,
    isTablet,
    isMobile
  };
};
