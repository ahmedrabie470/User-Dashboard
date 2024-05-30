import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface UserState {
  users: any[];
  total: number;
  user: any;
  loading: boolean;
  searchQuery: string; // Add searchQuery property to the state
}

export const initialState: UserState = {
  users: [],
  total: 0,
  user: null,
  loading: false,
  searchQuery: '', // Initialize searchQuery as empty string
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, UserActions.loadUser, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users, total }) => ({ ...state, users, total, loading: false })),
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(UserActions.setSearchQuery, (state, { searchQuery }) => ({ ...state, searchQuery })) // Update searchQuery in the state
);
