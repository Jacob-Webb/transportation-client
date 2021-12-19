import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

/**
 * AdminGuard is used for components to only allow users who have the role of Administrator.
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  /**
   * Injects dependencies into the guard.
   * @param authorizationService Gets the users' authorization level. 
   * @param router Navigates the user if necessary. 
   */
  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  /**
   * A user can activate a component if their authorization level is Admin, otherwise navigates to `/forbidden`.
   * @param next A required parameter for canActivate. Not used in this context.
   * @param state Adds the current url as a query parameter.
   * @returns {boolean} `true` if the user has the administrator role, `false` otherwise.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.isUserAdmin())
      return true;

    this.router.navigate(['/forbidden']), { queryParams: { returnUrl: state.url }};
      return false;
  }
  
}
