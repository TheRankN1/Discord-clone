import { createAction } from '@ngrx/store';

const MODULE = '[USERS]';

export const getUsers = createAction(`${MODULE}get all users`);
