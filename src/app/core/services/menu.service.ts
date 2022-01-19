import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Manages the app's sidenav menu.
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  /** Tracks whether or not the menu is open. */
  private opened: boolean = true;
  /** Allows components using menu service to set or subscribe to `this.opened`. */
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.opened);
  /** Pure Observable to let components using menu service subscribe to `this.opened`. */
  public isOpen$: Observable<boolean> = this.isOpen.asObservable();

  /**
   * Initializes `this.opened`
   */
  constructor() {
    this.isOpen$.subscribe(response => this.opened = response);
  }

  /**
   * Set the menu as opened or closed.
   * @param opened boolean value where `true` means the menu is open, `false` means menu is closed.
   */
  public setIsOpen(opened: boolean): void {
    this.isOpen.next(opened);
  }

  /**
   * Toggle the menu open or closed depending on the previous state. 
   * If opened, close the menu. If closed, open the menu.
   */
  public toggleMenu(): void {
    this.opened = !this.opened;
    this.setIsOpen(this.opened);
  }
}
