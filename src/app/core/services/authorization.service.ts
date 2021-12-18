import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokens, IDENTITY_ROLES } from 'src/app/app.constants';
import { Roles } from 'src/app/shared/models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private jwtHelper: JwtHelperService) { }

  public isUserAdmin = () => {
    const accessToken = localStorage.getItem(tokens.access);
    const decodedToken = accessToken !== null ? this.jwtHelper.decodeToken(accessToken) : undefined;
    const role = decodedToken[IDENTITY_ROLES];
    return role === Roles.administrator || Roles.superAdmin;
  }
}
