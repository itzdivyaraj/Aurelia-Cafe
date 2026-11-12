import { useEffect, useState } from 'react';

/**
 * Tracks whether the window has scrolled past a threshold (used for sticky navbar styling).
 */
export function useScrollPosition(threshold = 36) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
