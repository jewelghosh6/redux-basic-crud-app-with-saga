import { createSelector } from '@reduxjs/toolkit';
// import { RootState } from '../store';
import { usersApi } from '../api/UserApiSlice';

// const selectUserState = (state: RootState) => state.users;

// Selector to extract specific user details by ID
// export const selectUserDetailsByUserId = createSelector(
//   [selectUserState, (_: RootState, id: number) => id],
//   (users, id) => {
//     console.log('users', users);
    
//     return {
//       user: Array.isArray(users.users) ? users.users.find((user) => user.id === id) : undefined,
//     };
//   }
// );


// Selector to get all users
const selectUsers = createSelector(
  usersApi.endpoints.fetchUsers.select(),
  (result) => result?.data?.users || []
);

// Parameterized selector to get a user by ID
export const selectUserById = (userId: number) =>
  createSelector(selectUsers, (users) => users.find((user) => user.id === userId));


