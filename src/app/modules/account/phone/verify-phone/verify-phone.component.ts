import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { API_VERIFICATION, API_CONFIRM_PHONE, ROUTING_AUTH, ROUTING_CONFIRM_PHONE, ROUTING_FORGOT_PASSWORD, ROUTING_RESET_PASSWORD, API_RESET_PASSWORD_TOKEN } from 'src/app/app.constants';
import { UrlService } from 'src/app/core/services/url.service';
import { PhoneNumberDto, PhoneVerificationDto, ResetPasswordDto } from 'src/app/shared/models/account';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Component({
  selector: 'app-confirm-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {
  public verifyPhoneForm: FormGroup;
  codeLength: number = 6;
  private phoneNumber: string | null | undefined;
  private responseData: PhoneNumberDto | ResetPasswordDto | null = null;
  private previousUrl: string | null = null;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private urlService: UrlService,
    fb: FormBuilder) { 
      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

    // Should accept an object with a phoneNumber property
  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == null || this.responseData == undefined) 
      this.router.navigate([ROUTING_AUTH]); 

    this.phoneNumber = this.responseData?.phoneNumber;

    this.urlService.previousUrl$.subscribe((previousUrl: string | null) => {
      this.previousUrl = previousUrl;
    })
  }

  public verify() {
    const phoneVerificationDto: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode,
      phoneNumber: this.phoneNumber
    }

    // Set the information to branch where verify phone sends its data
    if (this.previousUrl?.includes(ROUTING_AUTH)) {
      // If the previous url was the auth (registration) page, verify and confirm phone number
      this.authService.confirmPhone(API_CONFIRM_PHONE, phoneVerificationDto)
      .subscribe(() => {
        this.router.navigate([ROUTING_CONFIRM_PHONE], {state: {data: this.phoneNumber}});
      }, error => {
        this.router.navigate([ROUTING_AUTH])
      })
    } else if (this.previousUrl?.includes(ROUTING_FORGOT_PASSWORD)){
      this.authService.resetPasswordToken(API_RESET_PASSWORD_TOKEN, phoneVerificationDto)
      .subscribe(response => {
        this.router.navigate([ROUTING_RESET_PASSWORD], {state: {data: response}});
      }, error => {
        this.router.navigate([ROUTING_AUTH])
      })
    }
  }  
}
