import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForRegistrationDto } from 'src/app/shared/models/user';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';

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

  constructor(private authService: AuthenticationService, 
    private router: Router,
    fb: FormBuilder) { 
      this.verifyPhoneForm = fb.group ({
        'verifyCode':['', Validators.compose([Validators.maxLength(this.codeLength), Validators.required])]
      })
    }

  ngOnInit(): void {
    this.responseData = history.state.data;
    console.log(this.responseData);
    // if (this.responseData == '' || this.responseData == undefined) 
    //   this.router.navigate(['access']);
  }

  public verify() {
    const phoneVerification: PhoneVerificationDto = {
      code: this.verifyPhoneForm.value.verifyCode
    }

   this.authService.verifyPhone(`api/Accounts/PhoneVerification/${this.responseData}`, phoneVerification)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    })
  }

}
