import { useMediaQuery } from "react-responsive";

export const useMedia = () => {
  const isSmallScreen = useMediaQuery({
    maxWidth: 640,
  });
  const isMediumScreen = useMediaQuery({
    maxWidth: 768,
  });
  const isLargeScreen = useMediaQuery({
    minWidth: 1024,
  });
  return { isLargeScreen, isMediumScreen, isSmallScreen };
};
