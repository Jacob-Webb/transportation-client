import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForRegistrationDto } from 'src/app/shared/models/user';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';
import { PHONE_VERIFICATION_URL } from 'src/app/app.constants';
import { UrlService } from 'src/app/core/services/url.service';
import { Observable } from 'rxjs';

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
    private urlService: UrlService,
    private router: Router,
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
      console.log('previous url: ', previousUrl);
      this.previousUrl = previousUrl;
    }) 
  }

  public verify() {
    const phoneVerification: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode
    }

    if (this.previousUrl == '/forgot-password') {

    }

    if (this.previousUrl == '/register') {
      this.authService.verifyPhone(PHONE_VERIFICATION_URL + `/${this.responseData}`, phoneVerification)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['phone-confirmation'], {state: {data: this.responseData}});
      }, error => {
        console.log(error);
        this.validationErrors = error;
      })
    }
  }

}
