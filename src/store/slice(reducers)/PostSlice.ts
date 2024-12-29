// src/store/postsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/types';

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
    //Fetch Posts
    fetchPostsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Add Post
    addPostRequest: (state, _action: PayloadAction<Post>) => {
      // state.posts.unshift(action.payload);
      state.loading = true;
      state.error = null;
    },

    addPostSuccess: (state, action: PayloadAction<Post>) => {
      state.loading = false;
      state.posts.unshift(action.payload);
    },

    addPostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Update Post
    updatePostRequest: (state, _action: PayloadAction<Post>) => {
      // const index = state.posts.findIndex((post) => post.id === action.payload.id);
      // if (index !== -1) {
      //   state.posts[index] = action.payload;
      // }
      state.loading = true;
      state.error = null;
    },

    updatePostSuccess: (state, action: PayloadAction<Post>) => {
      console.log('Updated Post: inside updatePostSuccess', action.payload);
      state.loading = false;
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

    updatePostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Delete Post
    deletePostRequest: (state, _action: PayloadAction<number>) => {
      // state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.loading = true;
      state.error = null;
    },

    deletePostSuccess: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    deletePostFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
