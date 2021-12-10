import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ACCESS_TOKEN, IDENTITY_ROLES } from 'src/app/app.constants';
import { Roles } from 'src/app/shared/models/roles';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient,
    private envUrl: EnvironmentUrlService, 
    private jwtHelper: JwtHelperService) { }

  public isUserAdmin = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const decodedToken = accessToken !== null ? this.jwtHelper.decodeToken(accessToken) : undefined;
    const role = decodedToken[IDENTITY_ROLES];
    return role === Roles.administrator || Roles.superAdmin;
  }
}
