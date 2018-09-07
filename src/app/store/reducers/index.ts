import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ActionReducerMap, createFeatureSelector, ActionReducer, MetaReducer } from '@ngrx/store';

import { localStorageSync } from 'ngrx-store-localstorage';

import { storeFreeze } from 'ngrx-store-freeze';




import * as fromRouter from '@ngrx/router-store';

import { Params } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}



export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate : true,
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;

    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    while ( state.firstChild ) {
      state = state.firstChild;
    }

    const { params } = state;

    return { url, queryParams, params };
  }
}





