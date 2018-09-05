import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import { AuthApiActions } from '../actions';

import * as fromRoot from '../../../store/reducers';

import * as fromAuth from '../reducers/auth.reducer';

import * as fromLoginPage from '../reducers/login-page.reducer';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<
  AuthState,
  AuthApiActions.AuthApiActionsUnion
> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');
