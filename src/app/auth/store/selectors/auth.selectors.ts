import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/';

import * as fromUser from '../reducers/auth.reducer';

export const selectAuthStatusState = createSelector(
  fromFeature.selectAuthState,
  (state: fromFeature.AuthState) => state.status
)

export const getUser = createSelector(
  selectAuthStatusState,
  fromUser.getUser
)

export const getLoggedIn = createSelector(
  getUser,
  user => !!user
)
