import { Features } from './features';
import { ActionReducerMap } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { userSessionReducer, UsersState } from './users/users.reducer';
import { UsersEffects } from './users/users.effects';
import { serversReducer, ServersState } from './servers/servers.reducer';
import { ServersEffects } from './servers/servers.effects';

export interface StoreState {
  [Features.Users]: UsersState;
  [Features.Servers]: ServersState;
  // [Features.Roles]: RolesState;
}

export const reducers: ActionReducerMap<StoreState> = {
  [Features.Users]: userSessionReducer,
  [Features.Servers]: serversReducer
};

export const strictStateChecks = !environment.production;
export const effects = [UsersEffects, ServersEffects];
