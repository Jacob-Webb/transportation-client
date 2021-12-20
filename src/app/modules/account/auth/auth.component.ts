import { Component, OnInit } from '@angular/core';

/**
 * A parent component to `register` and `login`. 
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  /** @ignore */
  constructor() { }

  /** @ignore */
  ngOnInit(): void {
  }

}
