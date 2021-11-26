import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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

    this.router.navigate(['access'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}
