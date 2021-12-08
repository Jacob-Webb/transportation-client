export interface UserForRegistrationDto {
  email: string | null;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
}

export interface UserForAuthenticationDto {
  phone: string;
  password: string;
}
