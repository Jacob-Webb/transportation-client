import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { FORGOT_PASSWORD_URL } from 'src/app/app.constants';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForgotPasswordDto } from 'src/app/shared/models/user';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  public hide: boolean = true;
  private returnUrl: string | undefined;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      phone: new FormControl("", [Validators.required])
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  public submit = (forgotPasswordForm: any) => {
    var forgotPasswordDto: UserForgotPasswordDto = { phone: forgotPasswordForm.phone}

    this.authService.forgotPassword(FORGOT_PASSWORD_URL, forgotPasswordDto)
    .subscribe(response => {
      this.router.navigate(['verify-phone'], {state: {data: forgotPasswordDto.phone}});
    })
  }

}
