import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../types/types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Users'], // Tag for invalidation
  endpoints: (builder) => ({
    fetchUsers: builder.query<{users: User[]}, void>({
      query: () => ({
        url: 'users',
        method: 'GET',
        params: { limit: 500 }      
      }),
      providesTags: ['Users'], // Used for cache invalidation
      keepUnusedDataFor: 5, // Keep data in the cache for 5 minutes (300 seconds)
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      // invalidatesTags: ['Users'], // Invalidates cache when a user is updated
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        console.log('onQueryStarted', user);
        try {
          const { data } = await queryFulfilled;
          dispatch(usersApi.util.updateQueryData('fetchUsers', undefined, (draft) => {
            const index = draft.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              draft.users[index] = { ...draft.users[index], ...data };
            }
          }));
        } catch (error) {
          console.log('Error updating user:', error);
        }
      },
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(usersApi.util.updateQueryData('fetchUsers', undefined, (draft) => {
            draft.users = draft.users.filter((user) => user.id !== id);
          }));
        } catch (error) {
          console.log('Error deleting user:', error);
        }
      }  
    }),
  }),
});

export const { useFetchUsersQuery, useUpdateUserMutation, useDeleteUserMutation} = usersApi;