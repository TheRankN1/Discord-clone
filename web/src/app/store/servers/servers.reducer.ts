import { createReducer, on } from '@ngrx/store';
import { ServerInterface } from '../../shared/interfaces/server.interface';
import { serversActions } from './index';
import { setCurrentServerFn, setActiveServerFn, setDefaultCurrentChannelFn, createServerFn } from './servers.helpers';
import { ChannelInterface } from '../../shared/interfaces/channel.interface';

export interface ServersState {
  servers: Array<ServerInterface>;
  currentServer: ServerInterface | null;
  currentChannel: ChannelInterface | null;
}

export const serversInitialState: ServersState = {
  servers: [],
  currentServer: null,
  currentChannel: null
};

export const serversReducer = createReducer<ServersState>(
  serversInitialState,
  on(serversActions.setServersFromLocalStorage, (state, props) => ({
    ...state,
    servers: props.servers
  })),
  on(serversActions.serverSelected, (state, props) => ({
    ...state,
    servers: setActiveServerFn(state.servers, props.id),
    currentServer: setCurrentServerFn(state.servers, props.id),
    currentChannel: setDefaultCurrentChannelFn()
  })),
  on(serversActions.createServer, (state, props) => ({
    ...state,
    servers: createServerFn(state.servers, props.title)
  }))
);
