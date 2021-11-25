import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/app/shared/models/user';
import { AuthResponseDto, RegistrationResponseDto } from 'src/app/shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { JwtToken } from 'src/app/shared/models/jwt-token';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
    private _envUrl: EnvironmentUrlService) { }
    private authChangeSubject = new Subject<boolean>()
    public authChanged = this.authChangeSubject.asObservable();

    public registerUser = (route: string, body: UserForRegistrationDto) => {
      return this.http.post<RegistrationResponseDto>(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    public verifyPhone = (route: string, body: PhoneVerificationDto) => {
      return this.http.post(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    public loginUser = (route: string, body: UserForAuthenticationDto) => {
      return this.http.post<AuthResponseDto>(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    public logout = () => {
      localStorage.removeItem("token");
      this.sendAuthStateChangeNotification(false);
    }

    public sendAuthStateChangeNotification = (isAuthenticated:boolean)=>{
      this.authChangeSubject.next(isAuthenticated);
    }

    private createCompleteRoute = (envAddress: string, route: string) => {
      return `${envAddress}/${route}`;
    }
}
