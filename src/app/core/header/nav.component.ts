import { Component } from '@angular/core';
// import { BasicAuthenticationService } from '../service/basic-authentication.service';
// import { AUTHENTICATED_USER, FIRST_NAME, StorageService, USER_ROLE } from '../service/data/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
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
 constructor(){}

  ngOnInit(): void {}
}