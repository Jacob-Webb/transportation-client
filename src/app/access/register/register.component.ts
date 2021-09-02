import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordMinLength = 3;
    phone: string;
    hide=true;
    hideConfirm=true;
    submitted=false;
    isUniqueEmail=true;
    user: User;
    error: boolean = false;


  constructor(private accountService: AccountService,
    private toastr: ToastrService, 
    private router: Router,
    fb: FormBuilder 
    ) { 
        this.registerForm = fb.group({
            'firstName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
            'lastName':['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z]*'), Validators.required])],
            'email':['', Validators.compose([Validators.email, Validators.required])],
            'phone':['', Validators.compose([])],
            'new-password':['', Validators.compose([Validators.minLength(3), Validators.required])],
            'confirm-password':['', Validators.compose([Validators.minLength(3), Validators.required])]
        },{
            // check whether or not our password and confirm password match
            validator: this.passwordMatchValidator
        })
    }

  ngOnInit(): void {
  }

  register() {
      this.user = new this.user(
          this.registerForm.controls['firstName'].value,
      )

  }

  passwordMatchValidator(formGroup: FormGroup) {
      const password: string = formGroup.get('new-password')?.value             // get password from our password form control
      const confirmPassword: string = formGroup.get('confirm-password')?.value  // get password from our confirmPassword form control 
      // compare if the passwords match
      if (password !== confirmPassword) {
          formGroup.get('confirm-password')?.setErrors({ NoPasswordMatch: true });
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
