import { User } from 'src/app/shared/models/user';
import { RegistrationResponse } from 'src/app/shared/models/registration-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../services/environment-url.service';
import { JwtToken } from 'src/app/shared/models/jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
    private _envUrl: EnvironmentUrlService) { }

    public registerUser = (route: string, body: User) => {
      return this.http.post<RegistrationResponse> (this.createCompleteRoute(route, this._envUrl.apiUrl), body);
    }

    public loginUser = (route: string, body: JwtToken) => {
      return this.http.post(this.createCompleteRoute(route, this._envUrl.apiUrl), body);
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
}
