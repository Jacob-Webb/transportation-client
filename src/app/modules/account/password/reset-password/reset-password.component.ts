import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTING_AUTH } from 'src/app/app.constants';
import { UrlService } from 'src/app/core/services/url.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public passwordForm: FormGroup | null = null;
  public password: string | null = null;
  public passwordMinLength = 3;
  public hide: boolean = true;
  public hideConfirm: boolean = true;
  private responseData: string | null = null;
  private previousUrl: string | null = null;

  constructor(private router: Router,
    private urlService: UrlService) { }

  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == '' || this.responseData == null) 
      this.router.navigate([ROUTING_AUTH]); 

    this.passwordForm = new FormGroup({
      password: new FormControl("", [
        Validators.required, 
        Validators.minLength(this.passwordMinLength)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(this.passwordMinLength)
      ])
    })

    // this.urlService.previousUrl$.subscribe((previousUrl: string | null) => {
    //   this.previousUrl = previousUrl;
    //   console.log(this.previousUrl);
    // })
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password: string = formGroup.get('password')?.value;
    const confirmPassword: string = formGroup.get('confirmPassword')?.value

    if (password!=confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ NoPasswordMatch: true });
    }
  }

}
