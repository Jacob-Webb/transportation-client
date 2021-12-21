import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays a reset password confirmation message.
 */
@Component({
  selector: 'app-updated-password',
  templateUrl: './updated-password.component.html',
  styleUrls: ['./updated-password.component.scss']
})
export class UpdatedPasswordComponent implements OnInit {
  /** This component expects to get data from a previous component. */
  previousNavigationData: string | undefined;

  /**
   * Injects dependencies into the component.
   * @param router Functionality for internal navigation.
   */
  constructor(private router: Router) { }

  /**
   * Restricts access to the component by checking that this page was navigated to by a 
   * previous page that passed a string. 
   */
  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == '' || this.previousNavigationData == undefined) {
      this.router.navigate(['/']); 
    }
  }

}
