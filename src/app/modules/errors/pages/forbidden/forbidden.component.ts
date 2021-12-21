import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Users are routed here when they have tried to access a component for which they are not authorized.
 */
@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  /** The url to return to when the user logs in with the appropriate authorization. */
  private returnUrl: string | undefined;

  /**
   * Injects dependencies to the component.
   * @param router Functionality for internal navigation.
   * @param route Functionality to track data for navigation.
   */
  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
   * Sets the return url.
   */
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'';
  }

  /**
   * Returns user to the login page with the url to return to in the event that the user successfully logs in with appropriate authorization.
   */
  public navigateToLogin = () => {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: this.returnUrl }});
  }

}
