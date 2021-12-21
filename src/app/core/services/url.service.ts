import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * A service to access the url while navigating.
 */
@Injectable({
  providedIn: 'root'
})
export class UrlService {
  /**
   * When subscribed to, previousUrl will give the previous url after navigation.
   */
  private previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  /**
   * An Observable type of this.previousUrl.
   */
  public previousUrl$: Observable<string | null> = this.previousUrl.asObservable();

  /**
   * @ignore
   */
  constructor() {}

  /**
   * Sets the `next` value to this.previousUrl
   * @param previousUrl The previous url after navigating to a new page.
   */
  public setPreviousUrl(previousUrl: string | null) {
    this.previousUrl.next(previousUrl);
  }

}
