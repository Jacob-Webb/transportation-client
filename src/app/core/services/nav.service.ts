import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * A service to access the url while navigating.
 */
@Injectable({
  providedIn: 'root'
})
export class NavService {
  /** When subscribed to, previousUrl will give the previous url after navigation. */
  private previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  /** An Observable type of this.previousUrl. */
  public previousUrl$: Observable<string | null> = this.previousUrl.asObservable();
  /** Represents the url where the user is currently. */
   public currentUrl = new BehaviorSubject<string | undefined>(undefined);

  /**
   * Injects dependencies into the service.
   * @param router Functionality for internal navigation.
   */
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          this.currentUrl.next(event.urlAfterRedirects);
      }
  });
  }

  /**
   * Sets the `next` value to this.previousUrl
   * @param previousUrl The previous url after navigating to a new page.
   */
  public setPreviousUrl(previousUrl: string | null) {
    this.previousUrl.next(previousUrl);
  }

}
