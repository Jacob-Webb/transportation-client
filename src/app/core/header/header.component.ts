import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MenuService } from '../services/menu.service';
import { NavService } from '../services/nav.service';

/**
 * Navbar component for the app.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /** Flag representing a user's authentication status. */
  public isUserAuthenticated:boolean | undefined;
  /** Get the title for the logo from the app's title. */
  @Input() title: string = '';

  /**
   * Injecst dependencies into component and initializes `isUserAuthenticated`.
   * @param authService Service for assertaining a user's authentication status.
   * @param router Functionality for internal navigation.
   * @param navService Functionality for tracking navigation data.
   * @param menuService Functionality for controlling the state of the menu.
   */
  constructor(private authService:AuthenticationService, 
    private router: Router, 
    public navService: NavService,
    public menuService: MenuService){
    this.authService.authChanged
    .subscribe(result => {
      this.isUserAuthenticated = result;
    })
  }
  
  /**
   * Continually check a user's authentication status. 
   */
  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(result =>{
      this.isUserAuthenticated = result;
    })
  }

  /**
   * On logout, remove a user's authentication status and send the user to the login page. 
   */
  public logout = () => {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
