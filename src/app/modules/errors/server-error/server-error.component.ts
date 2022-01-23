import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Displays error messages for all server errors (status code 500). 
 * For testing purposes only. Disable for production.
 */
@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  /** The error received that needs to be displayed. */
  error: any;

  /**
   * Injects dependencies to the component and initializes the property.
   * @param router Functionality for internal navigation.
   */
  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
  }

  /** @ignore */
  ngOnInit(): void {
  }

}
