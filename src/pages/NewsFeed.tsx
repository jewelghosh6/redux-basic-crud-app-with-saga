import React from 'react';
// import {  useDispatch } from 'react-redux';
// import {  AppDispatch } from '../store/store';
// import {
//   fetchPostsRequest,
//   addPostRequest,
//   deletePostRequest,
// } from '../store/reducers/PostSlice';
import PostComponent from '../components/Post';
import { Container } from '@mantine/core';
import { useFetchPostsQuery } from '../store/api/PostApiSlice';
import { useFetchUsersQuery } from '../store/api/UserApiSlice';
import AddPostForm from '../components/AddPost';

const NewsFeed: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  // useEffect(() => {
  //   dispatch(fetchPostsRequest());
  // }, [dispatch]);

  const {data:{posts=[]}={}, isLoading, error}=useFetchPostsQuery()

  const {  } = useFetchUsersQuery();


  // const handleAddPost = () => {
  //   const newPost = {
  //     id: Date.now(),
  //     title: 'New Post',
  //     body: 'This is a new post.',
  //     tags: ['new', 'post'],
  //     reactions: { likes: 0, dislikes: 0 },
  //     views: 0,
  //     userId: 1,
  //   };
  //   dispatch(addPostRequest(newPost));
  // };


  // const handleDeletePost = (id: number) => {
  //   dispatch(deletePostRequest(id));
  // };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error as string}</p>;

  return (
    <div className='container-basic'>
      <h1>Posts</h1>
      <Container mt={20}>
        <AddPostForm />
      </Container>
      {/* <button onClick={handleAddPost}>Add Post</button> */}
      <Container mt={20}>
        { posts && posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </Container>
    </div>
  );
};

export default NewsFeed;
