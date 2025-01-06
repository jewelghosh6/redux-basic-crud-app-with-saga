import React, { useRef, useEffect, useState } from "react";
import { Badge, Card, Center, Container, Flex, Group, Loader, Text } from "@mantine/core";
import { useFetchTodosQuery } from "../store/api/todoApiSlice";
import TodoCard from "../components/ToDoCard";

const Home: React.FC = () => {
  const lastElRef = useRef<HTMLDivElement | null>(null); // Reference for IntersectionObserver
  const [page, setPage] = useState<number>(1); // Track current page
  const [allData, setAllData] = useState<any[]>([]); // Accumulated data
  const [hasMore, setHasMore] = useState<boolean>(true); // Indicates if more data exists

  // Fetch the data for the current page
  const { data, isFetching, isError, isSuccess } = useFetchTodosQuery(page);

  // Handle new data and prevent duplicates
  useEffect(() => {
    if (isSuccess && data?.todos.length > 0) {
      setAllData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const uniqueData = data.todos.filter((item) => !existingIds.has(item.id));
        return [...prevData, ...uniqueData];
      });

      // If fewer than the page limit (10) items are returned, stop fetching
      if (data.todos.length < 10) {
        setHasMore(false);
      }
    }
  }, [data, isSuccess]);

  // Infinite scrolling logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting && // Last element is visible
          hasMore && // There is more data
          !isFetching // No fetch is in progress
        ) {
          setPage((prevPage) => prevPage + 1); // Increment the page
        }
      },
      { threshold: 0.1 }
    );

    if (lastElRef.current) {
      observer.observe(lastElRef.current);
    }

    return () => {
      if (lastElRef.current) {
        observer.unobserve(lastElRef.current);
      }
    };
  }, [hasMore, isFetching]);

  if (isError) return <p>Error fetching data...</p>;

  const handleToggleCompleted = (id: number) => {
    setAllData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <Container>
        {allData.map((item) => (
          <TodoCard
            key={item.id}
            item={item}
            onToggleCompleted={handleToggleCompleted}
          />
        ))}
        <div
          ref={lastElRef}
          style={{
            height: "50px",
            background: "transparent",
            marginTop: "20px",
          }}
        />
      </Container>
      <Flex justify="center" style={{ marginTop: "20px" }}>
        {isFetching && <Loader color="blue" />}
      </Flex>
      <Flex justify="center" style={{ marginTop: "20px" }}>
        {!hasMore && !isFetching && <p>No more data</p>}
      </Flex>
    </div>
  );
};

export default Home;
