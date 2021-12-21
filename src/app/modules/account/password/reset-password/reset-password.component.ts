import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiPaths, routerPaths } from 'src/app/app.constants';
import { AccountService } from 'src/app/core/services/account.service';
import Validation from 'src/app/shared/directives/validation';
import { ResetPasswordDto } from 'src/app/shared/models/account';

/**
 * The component for resetting a user's password. 
 */
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  /** Collects all data for the resetting password form. */
  public resetPasswordForm!: FormGroup;
  /** Password minimum length. */
  public passwordMinLength;
  /** Set to `true` when an uncaught error occurs. */
  public displayError;
  /** true` value hides the password, `false` value allows the password to be displayed. */
  hide: boolean;
  /** true` value hides the `confirmPassword` input, `false` value allows it to be displayed. */
  hideConfirm: boolean;
  /** This component expects to get data from a previous component. */
  private previousNavigationData: ResetPasswordDto | null;
  

  /**
   * Injects dependencies into the component and initializes properties.
   * @param router Functionality for internal navigation.
   * @param accountService Functionality for managing account user account information.
   */
  constructor(private router: Router,
    private accountService: AccountService,) {
      this.passwordMinLength = 3;
      this.displayError = false;
      this.hide = true;
      this.hideConfirm = true;
      this.previousNavigationData = null;
     }

  /**
   * Restricts access to the component by checking that this page was navigated to by a 
   * previous page that passed an instance of ResetPasswordDto. 
   * Initializes the `resetPasswordForm`. 
   */
  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == null || this.previousNavigationData == undefined) 
      this.router.navigate(['/']); 

    this.resetPasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required, 
        Validators.minLength(this.passwordMinLength)
      ]),
      confirmPassword: new FormControl("", [Validators.required])
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  /**
   * Submits the data from `resetPasswordForm` to the API.
   * @param resetPasswordFormValue Values from `resetPasswordForm`.
   */
  public submit = (resetPasswordFormValue: any) => {
    const formValue = { ...resetPasswordFormValue };
    const resetPasswordDto: ResetPasswordDto = {
      phoneNumber: this.previousNavigationData?.phoneNumber,
      password: formValue.password,
      token: this.previousNavigationData?.token
    }

    this.accountService.resetPassword(apiPaths.resetPassword, resetPasswordDto)
      .subscribe(() => {
        this.router.navigate([routerPaths.updatedPassword], {state: {data: resetPasswordDto.phoneNumber}});
      }, error => {
        this.router.navigate(['/'])
        this.displayError = true;
      })
  }

}
