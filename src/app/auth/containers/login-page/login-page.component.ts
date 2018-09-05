import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../store/reducers';

import { Credentials } from '../../models/user';

import { LoginPageActions } from '../../store/actions';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public pending$ = this.store.pipe()

  constructor(private store: Store<fromAuth.AuthState>) { }

  ngOnInit() {
  }

}
