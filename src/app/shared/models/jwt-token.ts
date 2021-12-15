/**
 * Data transfer object to accept and pass tokens to the backend
 */
export interface JwtTokenDto {
  /**
   * The access token represents the short-lived token passed back and forth 
   * to the backend to verify a user's authentication, thereby allowing access. 
   */
  accessToken: string;

  /**
   * The refresh token represents the long-lived token persisting in the user's 
   * account allowing for renewed access tokens as long as it is valid and not expired.
   */
  refreshToken: string;
}