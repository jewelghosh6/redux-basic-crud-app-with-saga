import  { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TextInput,
  Button,
  Avatar,
  Group,
  Card,
  Grid,
  Title,
  Divider,
  Stack,
  Box,
} from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectUserById } from '../store/selectors/userSelector';
import { useFetchUsersQuery } from '../store/api/UserApiSlice';
import { User } from '../types/types';

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  useFetchUsersQuery(); // Fetch users
  const user = useSelector(selectUserById(Number(userId)));

  const handleChange = (field: keyof User, value: string) => {
    console.log(`Updated ${field} to ${value}`);
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  if (!user) return <Title order={2} style={{ textAlign: 'center' }}>User not found</Title>;

  return (
    <Card
      shadow="lg"
      padding="xl"
      radius="lg"
      withBorder
      style={{
        maxWidth: 900,
        margin: 'auto',
        marginTop: '2rem',
        backgroundColor: isEditing ? '#f9f9f9' : '#ffffff',
      }}
    >
      {/* Header Section */}
      <Group style={{ justifyContent: 'space-between' }}>
        <Title order={2}>User Profile</Title>
        <Button
          variant="gradient"
          gradient={{ from: 'teal', to: 'blue' }}
          onClick={toggleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Group>

      <Divider my="lg" />

      {/* Main Section */}
      <Grid gutter="xl">
        <Grid.Col span={12}  style={{ textAlign: 'center' }}>
          <Avatar
            src={user.image}
            size={140}
            radius="50%"
            alt={`${user.firstName} ${user.lastName}`}
            style={{ border: '2px solid #ced4da' }}
          />
          <Title order={4} mt="sm">{`${user.firstName} ${user.lastName}`}</Title>
          <Box mt="xs" color="dimmed">
            {user.email}
          </Box>
        </Grid.Col>

        <Grid.Col span={12} >
          <Stack style={{ gap: 20 }}>
            {Object.entries(user).map(([key, value]) => {
              if (typeof value === 'object' || key === 'image') return null;

              return (
                <TextInput
                  key={key}
                  label={key
                    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
                    .replace(/_/g, ' ') // Replace underscores
                    .replace(/\b\w/g, (char) => char.toUpperCase())} // Capitalize first letter
                  value={value as string}
                  onChange={(e) =>
                    handleChange(key as keyof User, e.target.value)
                  }
                  disabled={!isEditing}
                  size="sm"
                />
              );
            })}
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default UserDetails;
