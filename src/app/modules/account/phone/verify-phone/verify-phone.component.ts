import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';
import { API_ACCOUNTS_VERIFICATION, API_ACCOUNTS_CONFIRM, ROUTING_AUTH, ROUTING_CONFIRM_PHONE, ROUTING_FORGOT_PASSWORD, ROUTING_RESET_PASSWORD } from 'src/app/app.constants';
import { UrlService } from 'src/app/core/services/url.service';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Component({
  selector: 'app-confirm-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {
  public verifyPhoneForm: FormGroup;
  codeLength: number = 6;
  validationErrors: string[] = [];
  private responseData: string = '';
  private previousUrl: string | null = null;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private urlService: UrlService,
    fb: FormBuilder) { 
      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == '' || this.responseData == undefined) 
      this.router.navigate([ROUTING_AUTH]); 

    this.urlService.previousUrl$.subscribe((previousUrl: string | null) => {
      this.previousUrl = previousUrl;
    })
  }

  public verify() {
    const phoneVerificationDto: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode,
      phoneNumber: this.responseData
    }

    let apiUrl = '';
    let navigationUrl = '';
    console.log("Previous Url: " + this.previousUrl)
    if (this.previousUrl?.includes(ROUTING_AUTH)) {
      apiUrl = API_ACCOUNTS_CONFIRM;
      navigationUrl = ROUTING_CONFIRM_PHONE;
    } else if (this.previousUrl?.includes(ROUTING_FORGOT_PASSWORD)) {
      apiUrl = API_ACCOUNTS_VERIFICATION;
      navigationUrl = ROUTING_RESET_PASSWORD;
    }
  
    this.authService.verifyPhone(apiUrl, phoneVerificationDto)
    .subscribe(() => {
      this.router.navigate([navigationUrl], {state: {data: phoneVerificationDto.phoneNumber}});
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }
}
