import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IConfig } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForAuthenticationDto } from 'src/app/shared/models/user';
import { ACCESS_TOKEN, ACCOUNT_LOGIN_URL, REFRESH_TOKEN } from 'src/app/app.constants';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  username!: string;
  password!: string;
  hide: boolean = true;
  validationErrors: string[] = [];
  error: boolean = false;
  private returnUrl: string | undefined;
  

  constructor(private authService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
      })

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    public validateControl = (controlName: string) => {
      return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
      return this.loginForm.controls[controlName].hasError(errorName)
    }

    public loginUser = (loginFormValue: any) => {
      const login = {...loginFormValue};
      const userForAuth: UserForAuthenticationDto = {
        phone: login.username,
        password: login.password
      }

      this.authService.loginUser(ACCOUNT_LOGIN_URL, userForAuth)
      .subscribe(result => {
        localStorage.setItem(ACCESS_TOKEN, result.accessToken);
        localStorage.setItem(REFRESH_TOKEN, result.refreshToken);
        this.authService.sendAuthStateChangeNotification(result.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.validationErrors = error;
        console.log(this.validationErrors);
      })
    }
}
