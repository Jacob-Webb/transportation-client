import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './core/authentication/authentication.service';
import { NavService } from './core/services/nav.service';
import { menu } from './shared/models/menu';
import { NavItem } from './shared/models/nav-item';

/**
 * Main app component to be bootstrapped.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
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
   * @param navService Functionality for managing the url data of the app.
   * @param router Functionality for internal navigation.
   */
  constructor(private authService: AuthenticationService,
    private navService: NavService,
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
          this.navService.setPreviousUrl(this.previousUrl);
        }
      })
  }
}
