import { useState, useEffect, useRef } from "react";

type InfiniteScrollOptions = {
  initialPage?: number;
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
};

type FetchDataCallback<T> = (page: number) => Promise<{
  items: T[];
  hasMore: boolean;
}>;

function useInfiniteScroll<T>(
  fetchDataCallback: FetchDataCallback<T>,
  options: InfiniteScrollOptions = {}
) {
  const { initialPage = 1, threshold = 0.1, root = null, rootMargin = "0px" } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false); // Ensure data is fetched at least once

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;

      console.log(`Fetching page: ${page}`); // Debugging
      setLoading(true);

      try {
        const result = await fetchDataCallback(page);
        setData((prevData) => [...prevData, ...result.items]);
        setHasMore(result.hasMore);
        setInitialized(true); // Mark initialization complete
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, fetchDataCallback, hasMore, loading]);

  useEffect(() => {
    if (!initialized || loading || !hasMore) return;

    const debouncedCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        console.log("Last element is visible. Loading next page..."); // Debugging
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(debouncedCallback, {
      root,
      rootMargin,
      threshold,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [initialized, loading, hasMore, root, rootMargin, threshold]);

  return { data, loading, hasMore, lastElementRef };
}

export default useInfiniteScroll;
