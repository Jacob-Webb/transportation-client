import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  private returnUrl: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl']||'';
  }

  public navigateToLogin = () => {
    this.router.navigate(['/auth'], { queryParams: { returnUrl: this.returnUrl }});
  }

}
