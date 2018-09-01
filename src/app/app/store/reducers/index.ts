import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromModels from '../../models/router';

import * as fromRouter from '@ngrx/router-store';

export interface RootState {
  routerReducer: fromRouter.RouterReducerState<fromModels.RouterStateUrl>;
}

export const reducers: ActionReducerMap<RootState> = {
  routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<fromModels.RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<fromModels.RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): fromModels.RouterStateUrl {
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
