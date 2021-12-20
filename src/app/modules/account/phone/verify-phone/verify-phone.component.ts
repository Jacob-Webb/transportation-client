import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UrlService } from 'src/app/core/services/url.service';
import { PhoneNumberDto, PhoneVerificationDto, ResetPasswordDto } from 'src/app/shared/models/account';
import { AccountService } from 'src/app/core/services/account.service';
import { apiPaths, routerPaths } from 'src/app/app.constants';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

/**
 * A component to input and send a verification code to the API.
 */
@Component({
  selector: 'app-confirm-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {
  /** Collects all data for verifying a phone number. */
  public verifyPhoneForm: FormGroup;
  /** Required code length. Set by settings at twilio.com's console. */
  public codeLength: number;
  /** The phone number that the Twilio verification code was sent to. */
  private phoneNumber: string | null | undefined;
  /**  The data sent through from the previous navigation. */
  private previousNavigationData: PhoneNumberDto | ResetPasswordDto | null;
  /** The previous url. */
  private previousUrl: string | null;

  /**
   * Injects dependencies into the component and initializes properties.
   * @param authService Functionality to manage a user's authentication.
   * @param accountService Functionality to manage a user's account information.
   * @param router Functionality for internal navigation.
   * @param urlService Functionality for data on navigation.
   * @param fb Builds a reactive form to gather the data in the verify phone form. 
   */
  constructor(private authService: AuthenticationService,
    private accountService: AccountService,
    private router: Router,
    private urlService: UrlService,
    fb: FormBuilder) { 
      this.previousNavigationData = null;
      this.previousUrl = null;
      this.codeLength = 6;

      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

  /**
   * Restricts access to the component by checking that this page was navigated to by a 
   * previous page that passed an instance of PhoneNumberDto. 
   * Retrieves the phone number from the data passed to the component, and gets the url prior to navigating to this component.
   */
  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == null || this.previousNavigationData == undefined) 
      this.router.navigate(['/']); 

    this.phoneNumber = this.previousNavigationData?.phoneNumber;

    this.urlService.previousUrl$.subscribe((previousUrl: string | null) => {
      this.previousUrl = previousUrl;
    })
  }

  /**
   * Send phone verification data to the API. 
   * If the previous url was from registering, send data to the confirm phone API controller.
   * If the previous url was from resetting the password, send data to the reset password API controller.
   */
  public verify() {
    const phoneVerificationDto: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode,
      phoneNumber: this.phoneNumber
    }

    // Set the information to branch where verify phone sends its data
    if (this.previousUrl?.includes(routerPaths.auth)) {
      // If the previous url was the auth (registration) page, verify and confirm phone number
      this.authService.confirmPhone(apiPaths.confirmPhone, phoneVerificationDto)
      .subscribe(() => {
        this.router.navigate([routerPaths.confirmPhone], {state: {data: this.phoneNumber}});
      })
    } else if (this.previousUrl?.includes(routerPaths.forgotPassword)){
      this.accountService.resetPasswordToken(apiPaths.resetPasswordToken, phoneVerificationDto)
      .subscribe(response => {
        this.router.navigate([routerPaths.resetPassword], {state: {data: response}});
      })
    }
  }  
}
