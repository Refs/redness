import { Injectable} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  LoginPageActions,
  AuthActions,
  AuthApiActions,
} from '../actions';

import { Observable, of } from 'rxjs';


import { Credentials } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LogoutConfirmationDialogComponent } from '../../components/logout-confirmation-dialog/logout-confirmation-dialog.component';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginPageActions.Login>(LoginPageActions.LoginPageActionTypes.Login),
    map(action => action.payload.credentials ),
    exhaustMap((auth: Credentials) => {
      return this.authService.login(auth)
          .pipe(
            map(user => new AuthApiActions.LoginSuccess({user})),
            catchError(error => of(new AuthApiActions.LoginFailure({error})) )
          )
    })
  )

  @Effect({ dispatch: false })
  LoginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.AuthApiActionTypes.LoginSuccess),
    tap(() => {
      this.router.navigate(['/'])
    })
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthApiActions.AuthApiActionTypes.LoginRedirect,
      AuthActions.AuthActionTypes.Logout
    ),
    tap(() => {
      this.router.navigate(['/login'])
    })
  )

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.LogoutConfirmation),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<
        LogoutConfirmationDialogComponent,
        undefined,
        boolean
      >(LogoutConfirmationDialogComponent,{
        width: '300px',
        position: {
          // top: '200px'
        }
      });
      return dialogRef.afterClosed();
    }),
    map(
      result => result
        ? new AuthActions.Logout()
        : new AuthActions.LogoutConfirmationDismiss()
    )

  )
}

