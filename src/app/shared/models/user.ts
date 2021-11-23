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
  role: string;
}

export interface UserForAuthenticationDto {
  username: string;
  password: string;
}
