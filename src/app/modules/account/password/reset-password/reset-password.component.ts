import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { apiPaths, routerPaths } from 'src/app/app.constants';
import { AccountService } from 'src/app/core/services/account.service';
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
  private returnUrl: string | undefined;
  private previousNavigationData: ResetPasswordDto | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,) { }

  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == null || this.previousNavigationData == undefined) 
      this.router.navigate(['/']); 
    console.log(this.previousNavigationData);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

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
      phoneNumber: this.previousNavigationData?.phoneNumber,
      password: formValue.password,
      token: this.previousNavigationData?.token
    }

    this.accountService.resetPassword(apiPaths.resetPassword, resetPasswordDto)
      .subscribe(() => {
        this.router.navigate([routerPaths.updatedPassword], {state: {data: resetPasswordDto.phoneNumber}});
      }, error => {
        this.router.navigate([this.returnUrl])
      })
  }

}
