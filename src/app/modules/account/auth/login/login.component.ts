import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { AuthenticationDto } from 'src/app/shared/models/account';
import { apiPaths, tokens } from 'src/app/app.constants';

/**
 * The component for user authentication.
 */
@Injectable({
  providedIn:'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** The group of data making up the login form. */
  public loginForm!: FormGroup;
  /** `true` value hides the password, `false` value allows the password to be displayed. */
  hide: boolean;
  /**
   * When a user requests a resource and is not authenticated, user is redirected to the login page.
   * returnUrl is set to the page they were currently on. Once the user is authenticated, the user 
   * will be redirected to the resource as defined in returnUrl. 
   */
  private returnUrl: string | undefined;

  /**
   * Injects dependencies to the component when constructed and initializes properties. 
   * @param authService A service for managing authentication. 
   * @param router Used for internal navigation.
   * @param route Functionality for the activated route.
   */
  constructor(private authService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute) {
      this.hide = true;
    }

  /**
   * Initializes the loginForm and sets the return url.
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  /**
   * On submission of the login form: 
   * Pass the log in data to the API.
   * If successful, set the access and refresh tokens in local storage, update the user's authentication status,
   * and navigate to the return url.
   * @param loginFormValue 
   */
  public loginUser = (loginFormValue: any) => {
    const login = {...loginFormValue};
    const userForAuthDto: AuthenticationDto = {
      phoneNumber: login.username,
      password: login.password
    }

    this.authService.loginUser(apiPaths.login, userForAuthDto)
    .subscribe(result => {
      localStorage.setItem(tokens.access, result.accessToken);
      localStorage.setItem(tokens.refresh, result.refreshToken);
      this.authService.sendAuthStateChangeNotification(result.isAuthSuccessful);
      this.router.navigate([this.returnUrl]);
    })
  }
}
