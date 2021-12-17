import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForRegistrationDto } from 'src/app/shared/models/account';
import { API_REGISTRATION, ROUTING_VERIFY_PHONE } from 'src/app/app.constants';
import { Roles } from 'src/app/shared/models/roles';

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
    public registerForm: FormGroup;
    validationErrors: string[] = [];
    passwordMinLength = 3;
    hide=true;
    hideConfirm=true;
    submitted=false;
    isUniqueEmail=true;
    phoneNumber = '';
    error: boolean = false;

  constructor(private authService: AuthenticationService,
    private router: Router,
    fb: FormBuilder) { 
        this.registerForm = fb.group({
            'firstName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            'lastName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            'email':['', Validators.compose([Validators.email])],
            'phoneNumber':['', Validators.compose([])],
            'address1': ['', Validators.compose([Validators.required])],
            'address2': [],
            'city':['', Validators.compose([Validators.required])],
            'zipCode':['', Validators.compose([Validators.required])],
            'password':['', Validators.compose([Validators.minLength(3), Validators.required])],
            'confirmPassword':['', Validators.compose([Validators.minLength(3), Validators.required])]
        },{
            // check whether or not our password and confirm password match
            validator: this.passwordMatchValidator
        })
    }

  ngOnInit(): void {
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

    this.authService.registerUser(API_REGISTRATION, user)
      .subscribe(response => {
        this.router.navigate([ROUTING_VERIFY_PHONE], {state: {data: response}});
      }, error => {
        if (error.status == 403) {
          this.router.navigate([ROUTING_VERIFY_PHONE], {state: {data: user}});
        }
        this.validationErrors = error;
      })
  }

  passwordMatchValidator(formGroup: FormGroup) {
      const password: string = formGroup.get('password')?.value                 // get password from our password form control
      const confirmPassword: string = formGroup.get('confirmPassword')?.value   // get password from our confirmPassword form control 
      // compare if the passwords match
      if (password !== confirmPassword) {
          formGroup.get('confirmPassword')?.setErrors({ NoPasswordMatch: true });
      }
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