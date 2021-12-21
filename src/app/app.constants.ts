/**
 * Path to collect identity roles for asp.net core Identity.
 */
 export const IDENTITY_ROLES = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

/**
 * Constant variables for the tokens used by the app. 
 */
export const tokens = {
  access: "accessToken",
  refresh: "refreshToken"
}

/**
 * Constant variables for routes to API controller methods. 
 */
export const apiPaths = {
  registration: "api/Accounts/Registration",
  login: "api/Accounts/Login",
  phoneVerification: "api/Accounts/PhoneVerification",
  forgotPassword: "api/Accounts/ForgotPassword",
  confirmPhone: "api/Accounts/PhoneConfirmation",
  resetPassword: "api/Accounts/ResetPassword",
  resetPasswordToken: "api/Accounts/ResetPasswordToken",
  refreshTokens: "api/Tokens/refresh"
}

/**
 * Constant variables for internal routing paths.
 */
export const routerPaths = {
  auth: 'auth',
  confirmPhone: 'phone-confirmation',
  forbidden: 'forbidden',
  forgotPassword: 'password/forgot-password',
  manageTemplates: 'manage-templates',
  notFound: '404',
  resetPassword: 'password/reset-password',
  updatedPassword: 'password/updated',
  verifyPhone: 'verify-phone',
  serverError: 'server-error'
}

