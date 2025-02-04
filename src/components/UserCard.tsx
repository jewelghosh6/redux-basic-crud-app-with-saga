import React, { useState } from 'react';
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Modal,
  TextInput,
  Stack,
  Avatar,
  ActionIcon,
  NumberInput,
} from '@mantine/core';
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
// import { deleteUserRequest, updateUserRequest } from '../store/reducers/UserSlice';
import { User } from '../types/types';
import { useDeleteUserMutation, useUpdateUserMutation } from '../store/api/UserApiSlice';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
//   onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [openedEditModal, setOpenedEditModal] = useState(false);
  const [formData, setFormData] = useState<User>({ ...user });
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();


  const handleChange = (field: keyof User, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  const handleUpdateUser= async() => {
    // console.log('Updated User:', formData); // Simulate saving
    setOpenedEditModal(false);
    // dispatch(updateUserRequest(formData));
    try {
      const result = await updateUser(formData).unwrap();
      console.log('Result:', result);
      notifications.show({
        title: 'Success',
        message: 'User updated successfully',
        color: 'green',
        position: 'top-right',
      });
      
    } catch (error) {
      console.error("Error updating user:", error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update user',
        color: 'red',
        position: 'top-right',
      });
    }

  }

  const userDeleteHandler =async () => {
    // dispatch(deleteUserRequest(user.id));
    const notificationId = notifications.show({
      title: 'Deleting User',
      message: 'Please wait...',
      color: 'yellow',
      position: 'top-right',
      loading: true
    });
    try {
      const result =await deleteUser(user.id).unwrap();
      console.log('Result:', result);
      notifications.update({
        id: notificationId,
        title: 'Success',
        message: 'User deleted successfully',
        color: 'green',
        position: 'top-right',
        loading: false
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      notifications.update({
        id: notificationId,
        title: 'Error',
        message: 'Failed to delete user',
        color: 'red',
        position: 'top-right',
        loading: false
      });
    }
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder mb={20}>
        <Group style={{ justifyContent: 'space-between' }}>
          <Group>
            <Avatar
              src={user.image || `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName}`}
              radius="xl"
              size="lg"
              style={ {
                marginRight: 4,
                border: "1px solid #c1c1c1",
                padding: "5px"
              } }
            />
            <div>
              <Text style={{ fontWeight: 500 }} size="lg">
                {user.firstName} {user.lastName}
              </Text>
              <Text size="sm" color="dimmed">
                {user.username} ({user.role})
              </Text>
            </div>
          </Group>
          <Group style={{ gap: 10 }}>
            <ActionIcon color="green" variant="light" onClick={() => navigate(`/users/${user.id}`)}>
              <IconEye size={20} />
            </ActionIcon>
            <ActionIcon color="blue" variant="light" onClick={() => setOpenedEditModal(true)}>
              <IconEdit size={20} />
            </ActionIcon>
            <ActionIcon color="red" variant="light" onClick={userDeleteHandler}>
              <IconTrash size={20} />
            </ActionIcon>
          </Group>
        </Group>

        <Text mt="sm" size="sm" color="dimmed">
          <strong>Email: </strong>{user.email}
        </Text>
        <Text size="sm" color="dimmed">
          <strong>Phone: </strong>{user.phone}
        </Text>
        <Text size="sm" color="dimmed">
          <strong>Age: </strong>{user.age}
        </Text>
        <Text size="sm" color="dimmed">
          <strong>Address: </strong>{user.address.address}, {user.address.city}, {user.address.state} - {user.address.postalCode}
        </Text>
        <Text size="sm" color="dimmed">
          <strong>Company: </strong>{user.company.name} - {user.company.title}
        </Text>

        <Group mt="md">
          <Badge color="blue" size="sm">
            {user.gender}
          </Badge>
          <Badge color="cyan" size="sm">
            Blood Group: {user.bloodGroup}
          </Badge>
        </Group>
      </Card>

      {/* Edit Modal */}
      <Modal opened={openedEditModal} onClose={() => setOpenedEditModal(false)} title="Edit User" size="lg">
        <Stack>
          <TextInput
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
          <TextInput
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
          <TextInput
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextInput
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          <TextInput
            label="Username"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
          <NumberInput
            label="Age"
            value={formData.age}
            onChange={(value) => handleChange('age', value)}
          />
          <TextInput
            label="Address"
            value={formData.address.address}
            onChange={(e) => handleChange('address', e.target.value)} // Address update directly
            />

            <TextInput
            label="City"
            value={formData.address.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            />
            <TextInput
            label="State"
            value={formData.address.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            />
            <TextInput
            label="Postal Code"
            value={formData.address.postalCode}
            onChange={(e) => handleAddressChange('postalCode', e.target.value)}
            />


          <Button
            onClick={handleUpdateUser}
          >
            Save Changes
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default UserCard;
