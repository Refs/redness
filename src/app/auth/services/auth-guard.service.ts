import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromAuthStore from '../store';
import { AuthApiActions } from '../store';
import { map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuthStore.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuthStore.getLoggedIn),
      map(authed => {
        if(!authed) {
          this.store.dispatch(new fromAuthStore.AuthApiActions.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    )
  }
}
