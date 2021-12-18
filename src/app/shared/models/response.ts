import { JwtTokenDto } from "./jwt-token";

/**
 * A Data Transfer Object to flag a successful registration attempt along 
 * with any errors that were encountered. 
 * 
 */
export interface RegistrationResponseDto {
    /**
     * A flag recording whether a registration attempt was successful. 
     */
    isSuccessfulRegistration: boolean;

    /**
     * Records any and all errors encountered when attempting a registration. 
     */
    errors: string[];
}

/**
 * A Data Transfer Object to pass access and refresh tokens upon successful authentication. 
 */
export interface AuthResponseDto extends JwtTokenDto {
  /**
   * A flag recording whether an authentication attempt was successful. 
   */
  isAuthSuccessful: boolean;
}
