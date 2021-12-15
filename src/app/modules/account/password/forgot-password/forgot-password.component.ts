import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { IConfig } from 'ngx-mask';
import { filter, pairwise } from 'rxjs/operators';
import { API_ACCOUNTS_FORGOT_PASSWORD, ROUTING_AUTH, ROUTING_VERIFY_PHONE } from 'src/app/app.constants';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UrlService } from 'src/app/core/services/url.service';
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
  private previousUrl: string | null = null;
  private returnUrl: string | undefined;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      phone: new FormControl("", [Validators.required])
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  public submit = (forgotPasswordForm: any) => {
    var forgotPasswordDto: UserForgotPasswordDto = { phone: forgotPasswordForm.phone}
    console.log(forgotPasswordDto.phone);
    this.authService.forgotPassword(API_ACCOUNTS_FORGOT_PASSWORD, forgotPasswordDto)
    .subscribe(response => {
      this.router.navigate([ROUTING_VERIFY_PHONE], {state: {data: forgotPasswordDto.phone}});
    })
  }

}
