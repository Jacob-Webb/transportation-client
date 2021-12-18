import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UrlService } from 'src/app/core/services/url.service';
import { PhoneNumberDto, PhoneVerificationDto, ResetPasswordDto } from 'src/app/shared/models/account';
import { AccountService } from 'src/app/core/services/account.service';
import { apiPaths, routerPaths } from 'src/app/app.constants';

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
  private previousNavigationData: PhoneNumberDto | ResetPasswordDto | null = null;
  private previousUrl: string | null = null;
  private returnUrl: string| undefined;

  constructor(private authService: AuthenticationService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    fb: FormBuilder) { 
      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

    // Should accept an object with a phoneNumber property
  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == null || this.previousNavigationData == undefined) 
      this.router.navigate(['/']); 

    this.phoneNumber = this.previousNavigationData?.phoneNumber;

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

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
    if (this.previousUrl?.includes(routerPaths.auth)) {
      // If the previous url was the auth (registration) page, verify and confirm phone number
      this.authService.confirmPhone(apiPaths.confirmPhone, phoneVerificationDto)
      .subscribe(() => {
        this.router.navigate([routerPaths.confirmPhone], {state: {data: this.phoneNumber}});
      }, error => {
        this.router.navigate([this.returnUrl])
      })
    } else if (this.previousUrl?.includes(routerPaths.forgotPassword)){
      this.accountService.resetPasswordToken(apiPaths.resetPasswordToken, phoneVerificationDto)
      .subscribe(response => {
        this.router.navigate([routerPaths.resetPassword], {state: {data: response}});
      }, error => {
        this.router.navigate([this.returnUrl])
      })
    }
  }  
}
