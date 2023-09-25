import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServersState } from './servers.reducer';
import { Features } from '../features';

export const serversFeatureSelector = createFeatureSelector<ServersState>(Features.Servers);

export const getServers = (state: ServersState) => state.servers;
export const selectServers = createSelector(serversFeatureSelector, getServers);
