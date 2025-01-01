import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../../types/types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Posts'], // Tag for invalidation
  endpoints: (builder) => ({
    fetchPosts: builder.query<{posts: Post[]}, void>({
      query: () => 'posts',
      providesTags: ['Posts'], // Used for cache invalidation
    }),
    createPost: builder.mutation<Partial<Post>, Post>({
        query: (newPost) => ({
          url: 'posts/add',  // Endpoint for creating a post
          method: 'POST',
          body: newPost,
        }),
        // invalidatesTags: ['Posts'], // Invalidate cache to refetch posts
        // Instead of invalidating the cache, update it directly
        onQueryStarted: async (newPost, { dispatch, queryFulfilled }) => {
            // const patchResult = dispatch(
            //     postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
            //         // Prepend the newly created post to the start of the list
            //         draft.posts.unshift(newPost);
            //     })
            // );

            // Optionally, you can handle the successful response here
            try {
            const { data } = await queryFulfilled;
            // Update the cache with the response data if needed
            dispatch(
                postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
                draft.posts.unshift(data as Post);  // Prepend the returned post data to the list
                })
            );
            } catch (err) {
            // Handle the error, possibly reverting the cache update if needed
            // patchResult.undo();
            }
        },
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      onQueryStarted: async (post, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
            // Find the post in the cache and update it
            const index = draft.posts.findIndex((p) => p.id === post.id);
            if (index !== -1) {
              draft.posts[index] = post as Post;
            }
          })
        );

        try {
          const { data } = await queryFulfilled;
          // Update the cache with the response data if needed
          dispatch(
            postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
              const index = draft.posts.findIndex((p) => p.id === post.id);
              if (index !== -1) {
                draft.posts[index] = data as Post;
              }
            })
          );
        } catch (err) {
          // Handle the error, possibly reverting the cache update if needed
          patchResult.undo();
        }
      },
    //   invalidatesTags: ['Posts'], // Invalidates cache when a user is updated
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
            // Find the post in the cache and remove it
            const index = draft.posts.findIndex((post) => post.id === id);
            if (index !== -1) {
              draft.posts.splice(index, 1);
            }
          })
        );

        try {
          const { data } = await queryFulfilled;
          // Update the cache with the response data if needed
          dispatch(
            postsApi.util.updateQueryData('fetchPosts', undefined, (draft) => {
              const index = draft.posts.findIndex((post) => post.id === id);
              if (index !== -1) {
                draft.posts.splice(index, 1);
              }
            })
          );
        } catch (err) {
          // Handle the error, possibly reverting the cache update if needed
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useFetchPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = postsApi;
