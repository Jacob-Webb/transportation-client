import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { apiPaths, routerPaths } from 'src/app/app.constants';
import { AccountService } from 'src/app/core/services/account.service';
import { PhoneNumberDto } from 'src/app/shared/models/account';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  public hide: boolean = true;
  private returnUrl: string | undefined = undefined;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      phone: new FormControl("", [Validators.required])
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  public submit = (forgotPasswordForm: any) => {
    var phoneNumberDto: PhoneNumberDto = { phoneNumber: forgotPasswordForm.phone}

    this.accountService.forgotPassword(apiPaths.forgotPassword, phoneNumberDto)
    .subscribe(() => {
      this.router.navigate([routerPaths.verifyPhone], {state: {data: phoneNumberDto}});
    })
  }

}
