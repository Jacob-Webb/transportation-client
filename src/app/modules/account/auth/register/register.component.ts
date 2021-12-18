import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForRegistrationDto } from 'src/app/shared/models/account';
import Validation from 'src/app/shared/directives/validation';
import { apiPaths, routerPaths } from 'src/app/app.constants';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm!: FormGroup;
    validationErrors: string[] = [];
    passwordMinLength = 3;
    hide=true;
    hideConfirm=true;
    submitted=false;
    isUniqueEmail=true;
    phoneNumber = '';
    error: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [
        Validators.required, 
        Validators.maxLength(20), 
        Validators.pattern('[a-zA-Z]*')
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z]*')
      ]), 
      email: new FormControl("", [Validators.email]),
      phoneNumber: new FormControl(""),
      address1: new FormControl("", [Validators.required]),
      address2: new FormControl(""),
      city: new FormControl("", [Validators.required]),
      zipCode: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ])
    }, {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  public register = (registerFormValue: any) => {

    const formValues = { ...registerFormValue };
    const user: UserForRegistrationDto = {
      password: formValues.password,
      phoneNumber: formValues.phoneNumber,
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      email: formValues.email !== '' ? formValues.email.trim() : null,
      address1: formValues.address1.trim(),
      address2: formValues.address2 !== null ? formValues.address2.trim() : null,
      city: formValues.city.trim(),
      zipCode: formValues.zipCode.trim()
    }

    this.authService.registerUser(apiPaths.registration, user)
      .subscribe(response => {
        this.router.navigate([routerPaths.verifyPhone], {state: {data: response}});
      }, error => {
        if (error.status == 403) {
          this.router.navigate([routerPaths.verifyPhone], {state: {data: user}});
        }
        this.validationErrors = error;
      })
  }

  getEmailError() {
      if (this.registerForm.controls['email'].hasError('required')) {
          return 'You must enter a value';
      }
      return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getFirstNameError() {
    if (this.registerForm.controls['firstName'].hasError('required')) {
      return 'First name is required';
    }
    return this.registerForm.controls['firstName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }

  getLastNameError() {
    if (this.registerForm.controls['lastName'].hasError('required')) {
      return 'Last name is required';
    }
    return this.registerForm.controls['lastName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }

}
