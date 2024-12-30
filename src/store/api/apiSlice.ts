import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }), // Replace with your API base URL
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      keepUnusedDataFor: 300, // Cache data for 5 minutes (300 seconds)
    }),
  }),
});

export const { useGetUsersQuery } = api;
export default api;
