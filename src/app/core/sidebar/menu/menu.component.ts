import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavItem } from '../../../shared/models/nav-item';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { menu } from '../../../shared/models/menu';
import { MenuService } from '../../services/menu.service';
import { AuthenticationService } from '../../authentication/authentication.service';

/**
 * Component representing the sidebar menu.
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  /** Indicates whether the sidebar is opened or closed. */
  public opened: boolean = true;
  /** Necessary because the component will need to release resources held by MediaObserver. */
  private mediaWatcher!: Subscription;
  /** An array of NavItem objects. It's the logical representation of the menu that the users will see. */
  public menu: NavItem[] = menu;
  /** Flag representing a user's authentication status. */
  public isUserAuthenticated: boolean | undefined;

  /**
   * Subscribes to the MediaObserver object. When there's any kind of change in media (for example, the user shrinks the browser window), the app will call the handleMediaChange() function
   * @param media Functionality for detecting media size.
   */
  constructor(private authService: AuthenticationService,
    private media: MediaObserver,
    private menuService: MenuService) {
    this.mediaWatcher = this.media.asObservable().subscribe((change: MediaChange[]) => {
      this.handleMediaChange(change[0]);
    })
    this.authService.authChanged
    .subscribe(result => {
      this.isUserAuthenticated = result;
    })
  }

  ngOnInit() {
    this.menuService.isOpen$.subscribe(response => this.opened = response);
  }

  /**
   * Releases the resource held by the Subscription object.
   */
  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }

  /**
   * Checks to see if the screen is less than medium sized ('lt-md'). If so, then it closes the sidebar menu.
   * @param mediaChange Functionality for detecting change in screen sizes.
   */
  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
        this.opened = false;
        this.menuService.setIsOpen(this.opened);
    } else {
        this.opened = true;
        this.menuService.setIsOpen(this.opened);
    }
  }
}
