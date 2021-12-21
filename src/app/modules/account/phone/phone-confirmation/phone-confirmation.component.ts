import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays a phone confirmation message.
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './phone-confirmation.component.html',
  styleUrls: ['./phone-confirmation.component.scss']
})
export class PhoneConfirmationComponent implements OnInit {
  /** Phone number that has been confirmed by the API. */
  userPhone: string;
  /** A formatted version of `userPhone`. */
  formattedPhone: string | null;

  /**
   * Injects dependencies into the component and initializes properties.
   * @param router Functionality for internal navigation.
   */
  constructor(private router: Router) {
    this.userPhone = '';
    this.formattedPhone = null;
   }

  /**
   * Restricts access to the component by checking that this page was navigated to by a 
   * previous page that passed a string. 
   * Formats the phone number to be displayed.
   */
  ngOnInit(): void {
    this.userPhone = history.state.data;
    if (this.userPhone == '' || this.userPhone == undefined) 
      this.router.navigate(['/']);

      this.formattedPhone = "(" + this.userPhone.substring(0, 3) + ")" + this.userPhone.substring(3, 6) + "-" + this.userPhone.substring(6);
  }

}
