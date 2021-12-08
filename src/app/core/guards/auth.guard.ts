import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_REFRESH } from 'src/app/app.constants';
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

    var accessToken = localStorage.getItem(ACCESS_TOKEN);
    const isRefreshSuccess = await this.tryRefreshingTokens(accessToken);
    if (!isRefreshSuccess) {
      this.router.navigate(['auth'], { queryParams: { returnUrl: state.url }});
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string | null): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string | null = localStorage.getItem(REFRESH_TOKEN);

    if(!token || !refreshToken) return false;

    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {
      const response = await this.http.post(this.envUrl.apiUrl + TOKEN_REFRESH, credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }), 
        observe: 'response'
      }).toPromise();
      // If token refresh is successful, set new tokens in local storage.
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem(ACCESS_TOKEN, newToken);
      localStorage.setItem(REFRESH_TOKEN, newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
  
}
