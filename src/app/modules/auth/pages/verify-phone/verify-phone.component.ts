import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';
import { PHONE_VERIFICATION_URL } from 'src/app/app.constants';
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
      this.router.navigate(['auth']); 

    this.urlService.previousUrl$.subscribe((previousUrl: string | null) => {
      this.previousUrl = previousUrl;
      console.log(this.previousUrl);
    })
  }

  public verify() {
    const phoneVerificationDto: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode,
      phoneNumber: this.responseData
    }

    this.authService.verifyPhone(PHONE_VERIFICATION_URL, phoneVerificationDto)
    .subscribe(response => {
      if (this.previousUrl == '/register') {
        this.router.navigate(['phone-confirmation'], {state: {data: phoneVerificationDto.phoneNumber}});
      }
      if (this.previousUrl == '/forgot-password') {
        this.router.navigate(['/reset-password'], {state: {data: phoneVerificationDto.phoneNumber}});
      }
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }
}
