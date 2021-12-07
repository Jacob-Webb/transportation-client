import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
// import { BasicAuthenticationService } from '../service/basic-authentication.service';
// import { AUTHENTICATED_USER, FIRST_NAME, StorageService, USER_ROLE } from '../service/data/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public isUserAuthenticated:boolean | undefined;
/*
  userName: string;
  role: string;
  name: string;
  email: string;

  constructor(public basicAuthenticationService: BasicAuthenticationService,
              private storageService: StorageService) {
    this.storageService.watchStorageItem(AUTHENTICATED_USER).subscribe(data => this.userName = data);
    this.storageService.watchStorageItem(FIRST_NAME).subscribe(data => this.name = data);
    this.storageService.watchStorageItem(USER_ROLE).subscribe(data => this.role = data);
  }
  */
 constructor(private authService:AuthenticationService, private router: Router){
   this.authService.authChanged
   .subscribe(result => {
     this.isUserAuthenticated = result;
   })
 }

  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(result =>{
      this.isUserAuthenticated = result;
    })
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
