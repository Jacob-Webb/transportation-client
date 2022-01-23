import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { apiPaths, routerPaths, tokens} from 'src/app/app.constants';
import { JwtTokenDto } from 'src/app/shared/models/jwt-token';
import { AuthenticationService } from '../authentication/authentication.service';
import { RoleService } from '../services/role.service';

/**
 * AuthGuard is used for components to only allow users who have been authenticated.  
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * Injects dependencies into the guard.
   * @param authService A service for accessing a user's authentication status. 
   * @param router Navigates the user after authentication status verification.
   */
  constructor(private authService: AuthenticationService, 
    private roleService: RoleService,
    private router: Router){}

  /**
   * Attempts to refresh the user's authentication. If successful allows user to activate component. Otherwise, navigates user to login page.
   * @param next A required parameter for canActivate. Not used in this context.
   * @param state Adds the current url as a query parameter.
   * @returns {boolean} `true` if user is authenticated, `false` otherwise. 
   */
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>{
    if (this.authService.isUserAuthenticated()) {
      if (next.data.roles && next.data.roles.indexOf(this.roleService.getUserRole()) === -1) {
        // this.router.navigate(['/']);
        console.log("next.data.roles: " + next.data.roles)
        console.log("next.data.roles: " + next.data.roles.indexOf(this.roleService.getUserRole()))
        console.log("userRole: " + this.roleService.getUserRole());
        return false;
      }
      return true;
    }

    const accessToken = localStorage.getItem(tokens.access);

    const isRefreshSuccess = await this.tryRefreshingTokens(accessToken);

    if (!isRefreshSuccess) {
      this.authService.sendAuthStateChangeNotification(false);
      this.router.navigate([routerPaths.access], { queryParams: { returnUrl: state.url }});
    }

    if (next.data.roles && next.data.roles.indexOf(this.roleService.getUserRole()) === -1) {
      this.router.navigate(['/']);
      return false;
    }

    this.authService.sendAuthStateChangeNotification(isRefreshSuccess);
    return isRefreshSuccess;
  }

  /**
   * Attempts to refresh the access token via the API. 
   * If successful, new refresh and access tokens are placed in local storage.
   * @param accessToken A users access token. 
   * @returns `true` on successful operation, `false` otherwise. 
   */
  private async tryRefreshingTokens(accessToken: string | null): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string | null = localStorage.getItem(tokens.refresh);

    if(!accessToken || !refreshToken) return false;

    var jwtToken: JwtTokenDto = {accessToken: accessToken, refreshToken: refreshToken}; 

    let isRefreshSuccess: boolean;

    try {
      const response = await this.authService.refreshAuthentication(apiPaths.refreshTokens, jwtToken).toPromise();

      const newToken = response.accessToken;
      const newRefreshToken = response.refreshToken;

      localStorage.setItem(tokens.access, newToken);
      localStorage.setItem(tokens.refresh, newRefreshToken);
      isRefreshSuccess = true;
    } catch(ex) {
      isRefreshSuccess = false;
    }

    return isRefreshSuccess;
  }
  
}
