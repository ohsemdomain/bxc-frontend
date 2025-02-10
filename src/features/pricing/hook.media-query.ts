// hook.media-query.ts
import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatch = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Initial check
    setMatches(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener('change', updateMatch);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
};