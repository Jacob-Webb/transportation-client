import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Routing from 'src/app/shared/directives/routing';
import { PhoneVerificationDto, ResetPasswordDto, PhoneNumberDto } from 'src/app/shared/models/account';
import { environment } from 'src/environments/environment';

/**
 * A service to manage aspects of a user's account. 
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  /**
   * Injects dependencies into the service.
   * @param http Sends and receives Http calls to the API.
   * @param envUrl Accesses the environment url.
   */
  constructor(private http: HttpClient
    ) {}

  /**
   * Sends data to the API and receives response to acquire a reset password token.
   * @param route The API route to acquire a reset password token
   * @param body Data sent to the API. An instance of the PhoneVerificationDto.
   * @returns An instance of HttpClient with type ResetPasswordDto. 
   */
  public resetPasswordToken = (route: string, body: PhoneVerificationDto) : Observable<ResetPasswordDto> => {
    return this.http.post<ResetPasswordDto>(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }

  /**
   * Sends data to the API and receives the response to the forgotPassword method.
   * @param route The API route to start a password reset session.
   * @param body Data sent to the API. An instance of the PhoneNumberDto.
   * @returns An instance of HttpClient.
   */
  public forgotPassword = (route: string, body: PhoneNumberDto) : Observable<any> => {
    return this.http.post(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }
  
  /**
   * Sends data to the API and receives a password reset token.
   * @param route The route to the api controller.
   * @param body Payload of type ResetPasswordDto sent to the api controller on the backend.
   * @returns Observable of type string. This string should represent a password reset token.
   */
  public resetPassword = (route: string, body: ResetPasswordDto) : Observable<any> => {
    return this.http.post(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }
}
