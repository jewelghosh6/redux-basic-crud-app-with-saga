import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ToDoItem = {
  id: number;
  todo: string;
  completed: boolean;
  userId: string;
};

type FetchResponse = {
  todos: ToDoItem[];
  total: number;
  skip: number;
  limit: number;
};

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    fetchTodos: builder.query<FetchResponse, number>({
      query: (page) => `todos?limit=10&skip=${(page - 1) * 10}`,
      serializeQueryArgs: ({ endpointName }) => endpointName, // Cache based on endpoint name
      merge: (currentCache, newResponse) => {
        return {
          ...currentCache,
          todos: [...(currentCache?.todos || []), ...newResponse.todos],
          total: newResponse.total,
          skip: newResponse.skip,
          limit: newResponse.limit,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useFetchTodosQuery } = todoApi;
