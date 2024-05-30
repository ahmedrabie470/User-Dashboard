import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('userState');

export const selectUsers = createSelector(selectUserState, (state: UserState) => state.users);
export const selectTotalUsers = createSelector(selectUserState, (state: UserState) => state.total);
export const selectUser = createSelector(selectUserState, (state: UserState) => state.user);
export const selectLoading = createSelector(selectUserState, (state: UserState) => state.loading);
export const selectSearchQuery = createSelector(selectUserState, (state: UserState) => state.searchQuery); // Add selector for search query

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectSearchQuery,
  (users, searchQuery) => {
    if (!searchQuery) {
      return users; // Return all users if no search query
    }
    // Filter users based on search query
    return users.filter(user =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);
