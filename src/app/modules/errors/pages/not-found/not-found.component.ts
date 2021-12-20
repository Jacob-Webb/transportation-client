import { Component, OnInit } from '@angular/core';

/**
 * Displays a 'not found' message on 404 errors. Occurs when a user attempts to access a page 
 * that is not in the front end, or when the app accesses a resource that is not found in the API. 
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  /** @ignore */
  constructor() { }

  /** @ignore */
  ngOnInit(): void {
  }

}
