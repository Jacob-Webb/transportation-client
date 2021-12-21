import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './core/authentication/authentication.service';
import { UrlService } from './core/services/url.service';

/**
 * Main app component to be bootstrapped.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** Title of the app for the browser. */
  title = 'Rock Transportation';
  /** Maintains the previous url for the app's navigation. */
  previousUrl: string | null;
  /** Maintains the current url for the app's navigation. */
  currentUrl: string | null;

  /**
   * Injects dependencies into the component and initializes properties.
   * @param authService Functionality for managing users' authentication.
   * @param urlService Functionality for managing the url data of the app.
   * @param router Functionality for internal navigation.
   */
  constructor(private authService: AuthenticationService,
    private urlService: UrlService,
    private router: Router) {
      this.previousUrl = null;
      this.currentUrl = null;
    }

  /**
   * If the user is authenticated, reset the authentication notification to the app to true.
   * Update the current and previous url for every initialization.
   */
  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.authService.sendAuthStateChangeNotification(true);
    }

    this.router.events 
      .subscribe((event:Event) => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
          this.urlService.setPreviousUrl(this.previousUrl);
        }
      })
  }
}
