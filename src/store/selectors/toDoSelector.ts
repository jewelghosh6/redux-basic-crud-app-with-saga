import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { todoApi } from "../api/todoApiSlice";


// Create a selector to get the total number of todos
export const selectTotalTodos = createSelector(
    todoApi.endpoints.fetchTodos.select(1), // Replace 1 with the page you are querying
    (fetchTodosResult) => fetchTodosResult?.data?.todos?.length || 0
  );
  