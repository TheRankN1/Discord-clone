import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StoreState } from './index';

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    // eslint-disable-next-line no-restricted-syntax
    console.debug(`%c${action.type}`, 'color:#22b455;background:darkslategrey', action);
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<StoreState>[] = environment.production ? [] : [debug];
