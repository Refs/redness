import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoginFormService } from '../../services/login-from.service';


import { Credentials } from '../../models/user';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input()
  public set pending (isPending: boolean) {
    if ( isPending ) {
      this.loginFormService.form.disable();
    } else {
      this.loginFormService.form.enable();
    }
  }

  @Input()
  public errorMessage : string | null;

  @Output()
  public submitted = new EventEmitter<Credentials>();

  constructor(
    public loginFormService: LoginFormService
  ) { }

  ngOnInit() {}

  public submit () {
    if (this.loginFormService.form.valid) {
      this.submitted.emit(this.loginFormService.form.value)
    }
  }

  public onClear () {
    this.loginFormService.initializeFormGroup();
  }

}
