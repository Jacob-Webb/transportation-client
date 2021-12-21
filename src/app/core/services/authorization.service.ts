import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokens, IDENTITY_ROLES } from 'src/app/app.constants';
import { Roles } from 'src/app/shared/models/roles';

/**
 * A service to manage a user's authorization for the app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  /**
   * Injects dependencies into the service. 
   * @param jwtHelper Helper methods for handling Javascript Web Tokens.
   */
  constructor(private jwtHelper: JwtHelperService) { }

  /**
   * Retrieve a user's role from the access token. 
   * @returns `true` if a user's role is administrator or above, `false` otherwise.
   */
  public isUserAdmin = () => {
    const accessToken = localStorage.getItem(tokens.access);
    const decodedToken = accessToken !== null ? this.jwtHelper.decodeToken(accessToken) : undefined;
    const role = decodedToken[IDENTITY_ROLES];
    return role === Roles.administrator || Roles.superAdmin;
  }
}
