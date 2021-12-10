export interface RegistrationResponseDto {
    isSuccessfulRegistration: boolean;
    errors: string[];
}

export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  accessToken: string;
  refreshToken: string;
}
