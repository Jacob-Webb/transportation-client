import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './core/authentication/authentication.service';
import { UrlService } from './core/services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Rock Transportation';
  previousUrl: string | null = null;
  currentUrl: string | null = null;

  constructor(private authService: AuthenticationService,
    private urlService: UrlService,
    private router: Router) {}

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
