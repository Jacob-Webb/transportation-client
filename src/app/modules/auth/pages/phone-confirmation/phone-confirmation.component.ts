import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_AUTH } from 'src/app/app.constants';

@Component({
  selector: 'app-confirmation',
  templateUrl: './phone-confirmation.component.html',
  styleUrls: ['./phone-confirmation.component.scss']
})
export class PhoneConfirmationComponent implements OnInit {
  userPhone: string = '';
  formattedPhone: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userPhone = history.state.data;
    if (this.userPhone == '' || this.userPhone == undefined) 
      this.router.navigate([ROUTING_AUTH]);

      this.formattedPhone = "(" + this.userPhone.substring(0, 3) + ")" + this.userPhone.substring(3, 6) + "-" + this.userPhone.substring(6);
  }

}
