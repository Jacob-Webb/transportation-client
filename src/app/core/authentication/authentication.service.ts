import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/app/shared/models/user';
import { AuthResponseDto, RegistrationResponseDto } from 'src/app/shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { JwtToken } from 'src/app/shared/models/jwt-token';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Roles } from 'src/app/shared/models/roles';
import { ACCESS_TOKEN, IDENTITY_ROLES } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
      private envUrl: EnvironmentUrlService, 
      private jwtHelper: JwtHelperService) { }

    private authChangeSubject = new Subject<boolean>()
    public authChanged = this.authChangeSubject.asObservable();

    public registerUser = (route: string, body: UserForRegistrationDto) => {
      return this.http.post<RegistrationResponseDto>(this.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public verifyPhone = (route: string, body: PhoneVerificationDto) => {
      return this.http.post(this.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public loginUser = (route: string, body: UserForAuthenticationDto) => {
      return this.http.post<AuthResponseDto>(this.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public logout = () => {
      localStorage.removeItem(ACCESS_TOKEN);
      this.sendAuthStateChangeNotification(false);
    }

    public sendAuthStateChangeNotification = (isAuthenticated:boolean) => {
      this.authChangeSubject.next(isAuthenticated);
    }

    public isUserAuthenticated = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
 
      return token && !this.jwtHelper.isTokenExpired(token);
    }

    public isUserAdmin = () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = accessToken !== null ? this.jwtHelper.decodeToken(accessToken) : undefined;
      const role = decodedToken[IDENTITY_ROLES];
      return role === Roles.administrator || Roles.superAdmin;
    }

    private createCompleteRoute = (envAddress: string, route: string) => {
      return `${envAddress}/${route}`;
    }
}
