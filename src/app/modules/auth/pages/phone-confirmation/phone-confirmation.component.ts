import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_AUTH } from 'src/app/app.constants';

@Component({
  selector: 'app-confirmation',
  templateUrl: './phone-confirmation.component.html',
  styleUrls: ['./phone-confirmation.component.scss']
})
export class PhoneConfirmationComponent implements OnInit {
  responseData: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == '' || this.responseData == undefined) 
      this.router.navigate([ROUTING_AUTH]);

  }

}
