//export interface UserForRegistrationDto extends AuthenticationDto {
export interface UserForRegistrationDto {
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string | null;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
}

export interface PhoneNumberDto {
  phoneNumber: string | null | undefined;
}

export interface AuthenticationDto extends PhoneNumberDto {
  password: string;
}

export interface ResetPasswordDto extends AuthenticationDto {
  token: string | null | undefined;
}

export interface PhoneVerificationDto extends PhoneNumberDto {
  code: string;
}
