import { useState } from 'react';
import {
  TextInput,
  Textarea,
  MultiSelect,
  Button,
  Group,
  Paper,
  Title,
  Grid,
} from '@mantine/core';
import { useCreatePostMutation } from '../store/api/PostApiSlice';
import { notifications } from '@mantine/notifications';

const AddPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState('');
  const [createPost] = useCreatePostMutation();

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
    }
    setNewTag('');
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      const result = await createPost({...formData,userId:1,reactions:{likes:0,dislikes:0},views:0} as any).unwrap();
      notifications.show({
        title: 'Success',
        message: 'Post created successfully',
        color: 'green',
        position: 'top-right',
      })
      console.log('Result:', result);
    } catch (error) {
         console.log('Error creating post:', error);
    }
  } 

  return (
    <Paper shadow="sm" p="md" radius="md" withBorder>
        <Title order={4}  mb="sm">
            Create Post
        </Title>
        <form onSubmit={formSubmitHandler}>
            <Grid gutter="xs">
                {/* Title and Tags on the same row */}

                <Grid.Col span={6}>
                    <TextInput
                        label="Title"
                        placeholder="Post title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        required
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <MultiSelect
                        label="Tags"
                        placeholder="Select or add tags"
                        data={formData.tags.map((tag) => ({ value: tag, label: tag }))}
                        value={formData.tags}
                        onChange={(value) => handleChange('tags', value)}
                        searchable
                        size="sm"
                    />
                </Grid.Col>

                {/* Body textarea */}
                <Grid.Col span={12}>
                    <Textarea
                        label="Body"
                        placeholder="Write your content"
                        value={formData.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        required
                        minRows={4}
                    />
                </Grid.Col>

                {/* Tag addition input and Submit */}
                <Grid.Col span={8}>
                    <TextInput
                        placeholder="Add a new tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        size="sm"
                    />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Button
                        fullWidth
                        size="sm"
                        onClick={handleAddTag}
                        variant="outline"
                    >
                        Add Tag
                    </Button>
                </Grid.Col>

                {/* Submit button */}
                <Grid.Col span={12}>
                    <Group  mt="sm" style={{display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type="submit" size="sm" color="blue" >
                        Post
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    </Paper>
  );
};

export default AddPostForm;
