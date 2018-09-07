import { Injectable } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  constructor (
    private http: HttpClient
  ) {}

  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  public initializeFormGroup() {
    this.form.setValue({
      username: '',
      password: ''
    })
  }
}
