import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTING_AUTH } from 'src/app/app.constants';

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
