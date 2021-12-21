import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiPaths, routerPaths } from 'src/app/app.constants';
import { AccountService } from 'src/app/core/services/account.service';
import { PhoneNumberDto } from 'src/app/shared/models/account';

/**
 * The component to begin a password reset when the user has forgotten it.
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  /** Collects all data for the forgotPassword form. */
  public forgotPasswordForm!: FormGroup;
  /** true` value hides the password, `false` value allows the password to be displayed. */
  public hide: boolean;

  /**
   * Injects dependencies into the component and initializes properties. 
   * @param accountService Functionality to manager user account information.
   * @param router Functionality for internal navigation.
   */
  constructor(private accountService: AccountService,
    private router: Router) {
      this.hide = true;
     }

  /**
   * Initializes `forgotPasswordForm` with form controls.
   */
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      phone: new FormControl("", [Validators.required])
    })
  }

  /**
   * Sends the `forgotPasswordForm` data to the API.
   * @param forgotPasswordForm Values from `forgotPasswordForm`. 
   */
  public submit = (forgotPasswordForm: any) => {
    var phoneNumberDto: PhoneNumberDto = { phoneNumber: forgotPasswordForm.phone}

    this.accountService.forgotPassword(apiPaths.forgotPassword, phoneNumberDto)
    .subscribe(() => {
      this.router.navigate([routerPaths.verifyPhone], {state: {data: phoneNumberDto}});
    }, error => {
      this.router.navigate(['/']);
    })
  }

}
