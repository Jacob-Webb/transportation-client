import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public previousUrl$: Observable<string | null> = this.previousUrl.asObservable();

  constructor() {}

  public setPreviousUrl(previousUrl: string | null) {
    this.previousUrl.next(previousUrl);
  }

}
