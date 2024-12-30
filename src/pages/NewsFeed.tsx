import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  fetchPostsRequest,
  addPostRequest,
  deletePostRequest,
} from '../store/reducers/PostSlice';
import PostComponent from '../components/Post';
import { Container } from '@mantine/core';

const NewsFeed: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: 'New Post',
      body: 'This is a new post.',
      tags: ['new', 'post'],
      reactions: { likes: 0, dislikes: 0 },
      views: 0,
      userId: 1,
    };
    dispatch(addPostRequest(newPost));
  };


  const handleDeletePost = (id: number) => {
    dispatch(deletePostRequest(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={handleAddPost}>Add Post</button>
      <Container mt={20}>
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} onDelete={handleDeletePost} />
        ))}
      </Container>
    </div>
  );
};

export default NewsFeed;
