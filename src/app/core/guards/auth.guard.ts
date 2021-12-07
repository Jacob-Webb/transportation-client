import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from 'src/app/app.constants';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserAuthenticated()) {
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(localStorage.getItem(ACCESS_TOKEN));
    if (!isRefreshSuccess) {
      this.router.navigate(['auth'], { queryParams: { returnUrl: state.url }});
    }

    return isRefreshSuccess;
  }
  
}
