import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { tokens, IDENTITY_ROLES } from 'src/app/app.constants';
import { Roles } from 'src/app/shared/models/roles';

/**
 * A service to manage a user's authorization for the app.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  /**
   * Injects dependencies into the service. 
   * @param jwtHelper Helper methods for handling Javascript Web Tokens.
   */
  constructor(private jwtHelper: JwtHelperService) {}

  public getUserRole = () : Roles => {
    const accessToken = localStorage.getItem(tokens.access);
    const decodedToken = accessToken !== null ? this.jwtHelper.decodeToken(accessToken) : undefined;
    return decodedToken[IDENTITY_ROLES];
  }

  /**
   * Retrieve a user's role from the access token. 
   * @returns `true` if a user's role is administrator or above, `false` otherwise.
   */
  public isUserAdmin = () : boolean => {
    return this.getUserRole() === Roles.administrator;
  }

  public isSuperAdmin = () : boolean => {
    return this.getUserRole() === Roles.superAdmin;
  }
}
