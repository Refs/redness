import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

import * as fromLoginPage from '../reducers/login-page.reducer';

export const selectLoginPageState = createSelector(
  fromFeature.selectAuthState,
  (state: fromFeature.AuthState) => state.loginPage
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
