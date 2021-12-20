import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForRegistrationDto } from 'src/app/shared/models/account';
import Validation from 'src/app/shared/directives/validation';
import { apiPaths, routerPaths } from 'src/app/app.constants';
import { Observable } from 'rxjs';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

/**
 * The component for users to register.
 */
@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** Collects all data for the registration form. */
  public registerForm!: FormGroup;
  /** The minimum length of a password. */
  passwordMinLength: number;
  /** true` value hides the password, `false` value allows the password to be displayed. */
  hide: boolean;
  /** true` value hides the `confirmPassword` input, `false` value allows it to be displayed. */
  hideConfirm: boolean;
  /** Set to `true` when an uncaught error occurs. */
  displayError: boolean;

  /**
   * Injects dependencies into the component and initializes properties.
   * @param authService Functionality to get and set authentication status.
   * @param router Functionality for internal navigation.
   */
  constructor(private authService: AuthenticationService,
    private router: Router) {
      this.passwordMinLength = 3;
      this.hide = true;
      this.hideConfirm = true;
      this.displayError = false;
    }

  /**
   * Initializes `registerForm` with the controls.
   */
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

  /**
   * Send the data from `registerForm` to the API.
   * @param registerFormValue Values from `registerForm`.
   */
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
        this.displayError = true;
      })
  }

  /**
   * Checks for errors determined by `email`'s validators.
   * @returns Message for user depending on the type of error encountered.
   */
  getEmailError() : string {
      if (this.registerForm.controls['email'].hasError('required')) {
          return 'You must enter a value';
      }
      return this.registerForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

    /**
   * Checks for errors determined by `firstName`'s validators.
   * @returns Message for user depending on the type of error encountered.
   */
  getFirstNameError() : string {
    if (this.registerForm.controls['firstName'].hasError('required')) {
      return 'First name is required';
    }
    return this.registerForm.controls['firstName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }

  /**
   * Checks for errors determined by `lastName`'s validators.
   * @returns Message for user depending on the type of error encountered.
   */
  getLastNameError() : string {
    if (this.registerForm.controls['lastName'].hasError('required')) {
      return 'Last name is required';
    }
    return this.registerForm.controls['lastName'].hasError('pattern') ? 'Name can only contain letters' : '';
  }

}
