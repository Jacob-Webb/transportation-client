import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Navbar component for the app.
 */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  /**
   * Flag representing a user's authentication status. 
   */
  public isUserAuthenticated:boolean | undefined;

  /**
   * Injects dependencies into component and initializes `isUserAuthenticated`.
   * @param authService Service for assertaining a user's authentication status. 
   * @param router Used for internal navigation.
   */
  constructor(private authService:AuthenticationService, private router: Router){
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
