import { UsersState } from './users.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from '../features';

export const selectFeatureUsers = createFeatureSelector<UsersState>(Features.Users);

export const getUsers = (state: UsersState) => state.users;
export const getLoggedUser = (state: UsersState) => state.loggedUser;

export const selectUsers = createSelector(selectFeatureUsers, getUsers);
export const selectLoggedUser = createSelector(selectFeatureUsers, getLoggedUser);
