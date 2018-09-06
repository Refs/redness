import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Credentials } from '../../models/user';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  @Input()
  public set pending (isPending: boolean) {
    if ( isPending ) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input()
  public errorMessage : string | null;

  @Output()
  public submitted = new EventEmitter<Credentials>();

  constructor() { }

  ngOnInit() {}

  public submit () {
    if (this.form.valid) {
      this.submitted.emit(this.form.value)
    }
  }

}
