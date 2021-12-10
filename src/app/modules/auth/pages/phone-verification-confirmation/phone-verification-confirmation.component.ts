import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './phone-verification-confirmation.component.html',
  styleUrls: ['./phone-verification-confirmation.component.scss']
})
export class PhoneVerificationConfirmationComponent implements OnInit {
  responseData: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.responseData = history.state.data;
    if (this.responseData == '' || this.responseData == undefined) 
      this.router.navigate(['auth']);
  }

}
