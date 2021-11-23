import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserForAuthenticationDto } from 'src/app/shared/models/user';

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

  constructor(private authService: AuthenticationService,
    private router: Router) {}

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required])
      })
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
        username: login.username,
        password: login.password
      }

      this.authService.loginUser('api/accounts/login', userForAuth)
      .subscribe(result => {
        localStorage.setItem("token", result.token);
        this.router.navigate(['/']);
      })
    }
}
