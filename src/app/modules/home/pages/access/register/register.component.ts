import { Component, EventEmitter, Injectable, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/shared/models/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

    passwordMinLength = 3;
    hide=true;
    hideConfirm=true;
    submitted=false;
    isUniqueEmail=true;
    error: boolean = false;


  constructor(private _authService: AuthenticationService,
    private toastr: ToastrService, 
    private router: Router,
    fb: FormBuilder 
    ) { 
        this.registerForm = fb.group({
            'firstName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
            'lastName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
            'email':['', Validators.compose([Validators.email, Validators.required])],
            'phone':['', Validators.compose([])],
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
    const user: User = {
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      address1: formValues.address1,
      address2: formValues.address2,
      city: formValues.city,
      zipCode: formValues.zipCode,
      role: "Rider"
    }
      
    this._authService.registerUser("api/Accounts/register", user)
      .subscribe(_=> {
        console.log("Successful registration");
      },
      error => {
        console.log(error.error.errors);
      })
  }

  passwordMatchValidator(formGroup: FormGroup) {
      const password: string = formGroup.get('password')?.value             // get password from our password form control
      const confirmPassword: string = formGroup.get('confirmPassword')?.value  // get password from our confirmPassword form control 
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
