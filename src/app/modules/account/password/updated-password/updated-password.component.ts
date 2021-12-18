import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updated-password',
  templateUrl: './updated-password.component.html',
  styleUrls: ['./updated-password.component.scss']
})
export class UpdatedPasswordComponent implements OnInit {
   previousNavigationData: string | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.previousNavigationData = history.state.data;
    if (this.previousNavigationData == '' || this.previousNavigationData == undefined) {
      this.router.navigate(['/']); 
    }
  }

}
