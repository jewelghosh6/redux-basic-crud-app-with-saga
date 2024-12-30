import React, { useState } from 'react';
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Modal,
  Textarea,
  TextInput,
  Stack,
  NumberInput,
  Avatar,
  ActionIcon,
} from '@mantine/core';
import { Post, Reactions } from '../types/types';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { updatePostRequest } from '../store/reducers/PostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { selectUserDetailsByUserId } from '../store/selectors/userSelector';
// import { UserState } from '../store/reducers/UserSlice';

interface PostProps {
  post: Post;
  onDelete: (id: number) => void; // Callback for deleting the post
}

const PostComponent: React.FC<PostProps> = ({ post, onDelete }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [formData, setFormData] = useState<Post>({ ...post });
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) =>
  {
    console.log('state', state,formData.userId);
    
    return selectUserDetailsByUserId( state, formData.userId )
  }
  );
  
  // const { users } = useSelector((state: RootState) => state.users);
  
  console.log('User:', user);
  

  const handleChange = <K extends keyof Post>(field: K, value: Post[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = <K extends keyof Reactions>(
    field: K,
    value: Reactions[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      reactions: { ...prev.reactions, [field]: value },
    }));
  };

  const handleUpdatePost = () => {
    // const updatedPost = {
    //   id,
    //   title: 'Updated Post Title',
    //   body: 'This post has been updated.',
    //   tags: ['updated'],
    //   reactions: { likes: 10, dislikes: 1 },
    //   views: 100,
    //   userId: 1,
    // };
    console.log('Updated Post Data:', formData); // Simulate saving data
    setOpened(false);
    dispatch(updatePostRequest(formData));
  };

  return (
    <>
      {/* Modal for Editing Post */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Post"
        size="lg"
      >
        <Stack>
          <TextInput
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <Textarea
            label="Body"
            value={formData.body}
            onChange={(e) => handleChange('body', e.target.value)}
            minRows={4}
          />
          <TextInput
            label="Tags (comma-separated)"
            value={formData.tags.join(', ')}
            onChange={(e) =>
              handleChange(
                'tags',
                e.target.value.split(',').map((tag) => tag.trim())
              )
            }
          />
          <Group grow>
            <NumberInput
              label="Likes"
              value={formData.reactions.likes}
              onChange={(value) =>
                handleNestedChange('likes', Number(value) || 0)
              }
            />
            <NumberInput
              label="Dislikes"
              value={formData.reactions.dislikes}
              onChange={(value) =>
                handleNestedChange('dislikes', Number(value) || 0)
              }
            />
            <NumberInput
              label="Views"
              value={formData.views}
              onChange={(value) => handleChange('views', Number(value) || 0)}
            />
          </Group>
          <NumberInput
            label="User ID"
            value={formData.userId}
            onChange={(value) => handleChange('userId', Number(value) || 0)}
          />
          <Button type='button'
            onClick={handleUpdatePost}
          >
            Save Changes
          </Button>
        </Stack>
      </Modal>

      {/* Post Card */}
      <Card shadow="sm" padding="lg" radius="md" withBorder mb={20}>
        <Group style={{ justifyContent: 'space-between' }} mb="md">
          <Group>
            {/* Randomly Generated Avatar */}
            <Avatar
              // src={`https://api.dicebear.com/6.x/initials/svg?seed=${Math.random()
              //   .toString(36)
              //   .substring(7)}`}
              src={user?.image }
              radius="xl"
              size="lg"
            />
            <div>
              <h3>{user?.firstName + ' ' + user?.lastName}</h3>
              <Text style={{ fontWeight: 500 }} size="lg">
                {post.title}
              </Text>
              <Text size="sm" color="dimmed">
                User ID: {post.userId}
              </Text>
            </div>
          </Group>
          <Group style={{ gap: '10px' }}>
            <ActionIcon
              color="blue"
              variant="light"
              onClick={() => setOpened(true)}
            >
              <IconEdit size={20} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => onDelete(post.id)}
            >
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </Group>

        <Text mt="sm" size="sm" color="dimmed">
          {post.body}
        </Text>
        <Group mt="md" style={{ gap: '10px' }}>
          {post.tags.map((tag, index) => (
            <Badge key={index} color="teal" size="sm">
              {tag}
            </Badge>
          ))}
        </Group>
        <Group mt="md" style={{ gap: '10px' }}>
          <Text size="sm" color="dimmed">
            {post.views} Views
          </Text>
          <Group style={{ gap: '10px' }}>
            <Badge color="green">Likes: {post.reactions.likes}</Badge>
            <Badge color="red">Dislikes: {post.reactions.dislikes}</Badge>
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default PostComponent;
