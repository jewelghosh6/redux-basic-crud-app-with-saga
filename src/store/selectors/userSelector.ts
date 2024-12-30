import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectUserState = (state: RootState) => state.users;

// Selector to extract specific user details by ID
export const selectUserDetailsByUserId = createSelector(
  [selectUserState, (_: RootState, id: number) => id],
  (users, id) => {
    return {
      user: Array.isArray(users.users) ? users.users.find((user) => user.id === id) : undefined,
    };
  }
);
