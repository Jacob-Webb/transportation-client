import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_REFRESH_URL } from 'src/app/app.constants';
import { JwtTokenDto } from 'src/app/shared/models/jwt-token';
import { AuthResponseDto } from 'src/app/shared/models/response';
import { AuthenticationService } from '../authentication/authentication.service';
import { EnvironmentUrlService } from '../services/environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, 
    private router: Router,
    private http: HttpClient,
    private envUrl: EnvironmentUrlService){}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    const isRefreshSuccess = await this.tryRefreshingTokens(accessToken);
    if (!isRefreshSuccess) {
      this.authService.sendAuthStateChangeNotification(false);
      this.router.navigate(['auth'], { queryParams: { returnUrl: state.url }});
    }

    this.authService.sendAuthStateChangeNotification(isRefreshSuccess);
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(accessToken: string | null): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN);

    if(!accessToken || !refreshToken) return false;

    var jwtToken: JwtTokenDto = {accessToken: accessToken, refreshToken: refreshToken}; 

    let isRefreshSuccess: boolean;

    try {
      const response = await this.authService.refreshAuthentication(TOKEN_REFRESH_URL, jwtToken).toPromise();

      const newToken = response.accessToken;
      const newRefreshToken = response.refreshToken;

      localStorage.setItem(ACCESS_TOKEN, newToken);
      localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
      isRefreshSuccess = true;
    } catch(ex) {
      isRefreshSuccess = false;
    }

    return isRefreshSuccess;
  }
  
}
