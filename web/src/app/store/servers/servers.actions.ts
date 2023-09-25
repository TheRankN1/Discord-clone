import { createAction, props } from '@ngrx/store';
import { ServerInterface } from '../../shared/interfaces/server.interface';

const MODULE = '[SERVERS] ';

export const setServersFromLocalStorage = createAction(MODULE + 'get servers', props<{ servers: Array<ServerInterface> }>());
export const serverSelected = createAction(MODULE + 'server selected', props<ServerSelected>());
export const openCreateServerModal = createAction(MODULE + 'open create server modal', props<{ component: unknown }>());
export const createServer = createAction(MODULE + 'create server', props<CreateServer>());

export interface ServerSelected {
  id: string;
}

export interface CreateServer {
  title: string;
  createdBy: string;
}
