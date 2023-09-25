import { createReducer, on } from '@ngrx/store';
import { UserDataBaseInterface } from '../../shared/interfaces/user-data-base.interface';
import { authActions } from './index';

export interface UsersState {
  users: Array<UserDataBaseInterface>;
  loggedUser: UserDataBaseInterface | null;
  loginErrorUsername: boolean;
  loginErrorPassword: boolean;
}

export const usersInitialState: UsersState = {
  users: [],
  loggedUser: null,
  loginErrorUsername: false,
  loginErrorPassword: false
};

export const userSessionReducer = createReducer<UsersState>(
  usersInitialState,
  on(authActions.login, (state, props) => {
    return {
      ...state,
      loggedUser: props.user
    };
  }),
  on(authActions.register, (state, props) => {
    return {
      ...state
    };
  })
);
