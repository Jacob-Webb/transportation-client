import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_RESET_PASSWORD, ROUTING_AUTH, ROUTING_UPDATED_PASSWORD } from 'src/app/app.constants';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UrlService } from 'src/app/core/services/url.service';
import Validation from 'src/app/shared/directives/validation';
import { ResetPasswordDto } from 'src/app/shared/models/account';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;
  public password: string | null = null;
  public passwordMinLength = 3;
  public hide: boolean = true;
  public hideConfirm: boolean = true;
  public error: boolean = false;
  private responseData: ResetPasswordDto | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == null || this.responseData == undefined) 
      this.router.navigate([ROUTING_AUTH]); 

    this.resetPasswordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required, 
        Validators.minLength(this.passwordMinLength)
      ]),
      confirmPassword: new FormControl("", [Validators.required])
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    });
  }

  public submit = (resetPasswordFormValue: any) => {
    const formValue = { ...resetPasswordFormValue };
    const resetPasswordDto: ResetPasswordDto = {
      phoneNumber: this.responseData?.phoneNumber,
      password: formValue.password,
      token: this.responseData?.token
    }

    this.authService.resetPassword(API_RESET_PASSWORD, resetPasswordDto)
      .subscribe(() => {
        this.router.navigate([ROUTING_UPDATED_PASSWORD]);
      }, error => {
        this.router.navigate([ROUTING_AUTH])
      })
  }

}
