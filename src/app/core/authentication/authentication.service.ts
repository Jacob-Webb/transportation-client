import { AuthenticationDto, PhoneNumberDto, PhoneVerificationDto, ResetPasswordDto, UserForRegistrationDto } from 'src/app/shared/models/account';
import { AuthResponseDto } from 'src/app/shared/models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tokens } from 'src/app/app.constants';
import { JwtTokenDto } from 'src/app/shared/models/jwt-token';
import Routing from 'src/app/shared/directives/routing';
import { environment } from 'src/environments/environment';

/**
 * A service to manage users' authentication in the app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Injects dependencies into the service. 
   * @param http Sends and receives Http calls to the API.
   * @param envUrl Accesses the environment url.
   * @param jwtHelper Accesses helper functions for JWT's.
   */
  constructor(private http: HttpClient, 
    private jwtHelper: JwtHelperService) { }

  /**
   * Tracks the changes to users' authentication status.
   */
  private authChangeSubject = new Subject<boolean>();
  /**
   * The Obervable version of authChangeSubject, allowing authentication status to be observed.
   */
  public authChanged = this.authChangeSubject.asObservable();

  /**
   * Sends data to the API and receives response to confirm users' phone numbers. 
   * @param route The API route to phone confirmation.
   * @param body Data sent to the API. An instance of the PhoneVerificationDto.
   * @returns An instance of HttpClient. 
   */
  public confirmPhone = (route: string, body: PhoneVerificationDto) => {
    return this.http.post(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }

  /**
   * Gets users' authentication status from tokens stored in local storage. 
   * @returns {boolean} `true` if an access token is present and not expired.
   */
  public isUserAuthenticated = () => {
    const accessToken = localStorage.getItem(tokens.access);

    return accessToken && !this.jwtHelper.isTokenExpired(accessToken);
  }

  /**
   * Sends data to the API and receives response for authenticating user, logging him/her in if successful.
   * @param route The API route to authentication.
   * @param body Data sent to the API. An instance of AuthenticationDto.
   * @returns An instance of HttpClient with type AuthResponseDto.
   */
  public loginUser = (route: string, body: AuthenticationDto) => {
    return this.http.post<AuthResponseDto>(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }

  /**
   * Removes access and refresh tokens from local storage and updates `authChangeSubject` to `false`.
   */
  public logout = () : void => {
    localStorage.removeItem(tokens.access);
    localStorage.removeItem(tokens.refresh);
    this.sendAuthStateChangeNotification(false);
  }

  /**
   * Sends data to the API and receives response for refreshing authentication. 
   * @param route The API route to authentication refreshing. 
   * @param body Data sent to the API. An instance of JwtTokenDto.
   * @returns An instance of HttpClient of type AuthResponseDto.
   */
  public refreshAuthentication = (route: string, body: JwtTokenDto) => {
    return this.http.post<AuthResponseDto>(Routing.createCompleteRoute(environment.apiUrl, route), body);
  }

  /**
   * Sends data to the API and receives response for user registration. 
   * @param route The API route to registration.
   * @param body Data sent to the API. An instance of the UserForRegistrationDto.
   * @returns An instance of HttpClient of type PhoneNuberDto. 
   */
     public registerUser = (route: string, body: UserForRegistrationDto) => {
      return this.http.post<PhoneNumberDto>(Routing.createCompleteRoute(environment.apiUrl, route), body);
    }
 
  /**
   * Updates the users' authentication status. 
   * @param isAuthenticated A users' authentication status.
   */
  public sendAuthStateChangeNotification = (isAuthenticated:boolean) : void => {
    this.authChangeSubject.next(isAuthenticated);
  }
}
