import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ behavior = 'smooth', threshold = 0 }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior });
        return;
      }
    }

    if (threshold > 0) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > threshold) {
        window.scrollTo({ top: 0, behavior });
      }
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }, [pathname, hash, behavior, threshold]);

  return null;
};

export default ScrollToTop;