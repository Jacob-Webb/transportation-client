/**
 * Data Transfer Object using a phone number and password request authentication.
 */
 export interface AuthenticationDto extends PhoneNumberDto {
  /**
   * A plain-text, non-hashed string representing a password. 
   * For security, ensure hashing takes place on the backend.
   * Maximum length: 255 characters. Required by the backend.
   */
  password: string;
}

/**
 * Data Transfer Object to send and receive phone number.
 */
 export interface PhoneNumberDto {
  /**
   * A strictly 10-digit string representing a valid phone number capable of SMS.
   */
  phoneNumber: string | null | undefined;
}

/**
 * Data Transfer Object to transmit a phone number - verification code pair.
 */
 export interface PhoneVerificationDto extends PhoneNumberDto {
  /**
   * A verification code that must match the code sent to the associated phone number
   * in order to be verify the phone number.
   */
  code: string;
}

/**
 * Data Transfer Object sending and receiving a password reset token.
 */
 export interface ResetPasswordDto extends AuthenticationDto {
  /**
   * A password reset token assigned to a user from asp.net core Identity.
   * The token is required and must match the generated token in order to successfully 
   * update a user's password. 
   */
  token: string | null | undefined;
}

/**
 * Data Transfer Object to send and receive all user information required for registering with the app.
 */
export interface UserForRegistrationDto extends AuthenticationDto {
  /**
   * A user's first name. Required by the backend. 
   */
  firstName: string;
  /**
   * A user's last name. Required by the backend.
   */
  lastName: string;
  /**
   * Must be formatted as `sometext@moretext.TLD`. 
   * Not required by backend.
   */
  email: string | null;
  /**
   * A user's main street address. Required by the backend.
   */
  address1: string;
  /**
   * A user's apartment number, suite, or any other 'secondary' address. 
   * Not required by the backend. 
   */
  address2: string | null;
  /**
   * The city portion of the user's address.
   * Required by the backend.
   */
  city: string;
  /**
   * The zip code portion of the user's address. Typically 5 digits long.
   * Required by the backend.
   */
  zipCode: string;
}
