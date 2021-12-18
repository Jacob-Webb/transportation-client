import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Routing from 'src/app/shared/directives/routing';
import { PhoneVerificationDto, ResetPasswordDto, PhoneNumberDto } from 'src/app/shared/models/account';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, 
    private envUrl: EnvironmentUrlService
    ) {}

    public resetPasswordToken = (route: string, body: PhoneVerificationDto) => {
      return this.http.post<ResetPasswordDto>(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }

    public forgotPassword = (route: string, body: PhoneNumberDto) => {
      return this.http.post(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }
    
    /**
     *  resetPassword sends a payload of body to the route and receives a password reset token.
     * @param route The route to the api controller.
     * @param body Payload of type ResetPasswordDto sent to the api controller on the backend
     * @returns Observable of type string. This string should represent a password reset token
     */
    public resetPassword = (route: string, body: ResetPasswordDto) => {
      return this.http.post(Routing.createCompleteRoute(this.envUrl.apiUrl, route), body);
    }
}
