import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromAuthStore from '../../store';

import { Credentials } from '../../models/user';

import { LoginPageActions } from '../../store/actions';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  pending$ = this.store.pipe(select(fromAuthStore.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuthStore.getLoginPageError));

  constructor(private store: Store<fromAuthStore.State>) { }

  ngOnInit() {
  }

  onSubmit(credentials: Credentials) {
    this.store.dispatch(new LoginPageActions.Login({ credentials }));
  }
}
