import { createAction, props } from '@ngrx/store';
import { UserDataBaseInterface } from '../../shared/interfaces/user-data-base.interface';

const MODULE = '[AUTH]';

export const login = createAction(`${MODULE} login`, props<LoginInterface>());
export const register = createAction(`${MODULE} register`, props<RegisterInterface>());

export interface LoginInterface {
  user: UserDataBaseInterface;
}

export interface RegisterInterface {
  username: string;
  password: string;
  fullName: string;
  email: string;
  day: number | string;
  month: number | string;
  year: number | string;
}
