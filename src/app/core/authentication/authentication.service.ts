import { UserForRegistrationDto } from 'src/app/shared/models/user';
import { RegistrationResponse } from 'src/app/shared/models/registration-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { JwtToken } from 'src/app/shared/models/jwt-token';
import { PhoneVerificationDto } from 'src/app/shared/models/phone-verification';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
    private _envUrl: EnvironmentUrlService) { }

    public registerUser = (route: string, body: UserForRegistrationDto) => {
      return this.http.post<RegistrationResponse>(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    public verifyPhone = (route: string, body: PhoneVerificationDto) => {
      return this.http.post(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    public loginUser = (route: string, body: JwtToken) => {
      return this.http.post(this.createCompleteRoute(this._envUrl.apiUrl, route), body);
    }

    private createCompleteRoute = (envAddress: string, route: string) => {
      return `${envAddress}/${route}`;
    }
}
