import { useEffect, useRef } from "react";

const useInfiniteScroll = (
  hasMore: boolean,
  isLoading: boolean,
  onIntersect: () => void,
  threshold = 1.0
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting && // Element is visible
          hasMore && // There is more data to fetch
          !isLoading // Fetching is not in progress
        ) {
          onIntersect(); // Trigger the callback
        }
      },
      { threshold, rootMargin: "50px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading, onIntersect, threshold]);

  return observerRef;
};

export default useInfiniteScroll;
