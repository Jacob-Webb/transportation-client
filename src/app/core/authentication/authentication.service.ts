import { AuthenticationDto, PhoneNumberDto, PhoneVerificationDto, ResetPasswordDto, UserForRegistrationDto } from 'src/app/shared/models/account';
import { AuthResponseDto } from 'src/app/shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokens } from 'src/app/app.constants';
import { JwtTokenDto } from 'src/app/shared/models/jwt-token';
import Routing from 'src/app/shared/directives/routing';

@Injectable({
  providedIn: 'root'
})
/**
 * A service to manage users' authentication in the app.
 */
export class AuthenticationService {

    constructor(private http: HttpClient,
      private envUrl: EnvironmentUrlService, 
      private jwtHelper: JwtHelperService) { }

    private authChangeSubject = new Subject<boolean>()
    public authChanged = this.authChangeSubject.asObservable();

    public registerUser = (route: string, body: UserForRegistrationDto) => {
      return this.http.post<PhoneNumberDto>(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public loginUser = (route: string, body: AuthenticationDto) => {
      return this.http.post<AuthResponseDto>(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public logout = () => {
      localStorage.removeItem(tokens.access);
      localStorage.removeItem(tokens.refresh);
      this.sendAuthStateChangeNotification(false);
    }

    public sendAuthStateChangeNotification = (isAuthenticated:boolean) => {
      this.authChangeSubject.next(isAuthenticated);
    }

    public isUserAuthenticated = () => {
      const accessToken = localStorage.getItem(tokens.access);

      return accessToken && !this.jwtHelper.isTokenExpired(accessToken);
    }

    public refreshAuthentication = (route: string, body: JwtTokenDto) => {
      return this.http.post<AuthResponseDto>(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public confirmPhone = (route: string, body: PhoneVerificationDto) => {
      return this.http.post(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }
}
