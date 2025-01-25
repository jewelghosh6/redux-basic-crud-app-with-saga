import React, { useState, useEffect } from "react";
import { Container, Flex, Loader } from "@mantine/core";
import { useFetchTodosQuery } from "../store/api/todoApiSlice";
import TodoCard from "../components/ToDoCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Home: React.FC = () => {
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
      if (data.todos.length === data.total) {
        setHasMore(false);
      }
    }
  }, [data, isSuccess]);

  // Use the custom hook for infinite scrolling
  const lastElRef = useInfiniteScroll(hasMore, isFetching, () => {
    setPage((prevPage) => prevPage + 1);
  });

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
            height: "10px",
            background: "blue",
            marginTop: "20px",
          }}
        />
      </Container>
      <Flex justify="center" style={{ marginTop: "20px" }}>
        {isFetching && <p>Loading... Page: {page}</p>} {isFetching && <Loader color="blue" />}
      </Flex>
      <Flex justify="center" style={{ marginTop: "20px" }}>
        {!hasMore && !isFetching && <p>No more data</p>}
      </Flex>
    </div>
  );
};

export default Home;
