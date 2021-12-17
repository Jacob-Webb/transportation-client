export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const IDENTITY_ROLES = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

// Api paths
export const API_REGISTRATION = "api/Accounts/Registration";
export const API_LOGIN = "api/Accounts/Login";
export const API_VERIFICATION = "api/Accounts/PhoneVerification";
export const API_CONFIRM_PHONE = "api/Accounts/PhoneConfirmation";
export const API_FORGOT_PASSWORD = "api/Accounts/ForgotPassword";
export const API_RESET_PASSWORD = "api/Accounts/ResetPassword";
export const API_RESET_PASSWORD_TOKEN = "api/Accounts/ResetPasswordToken"
export const API_TOKENS_REFRESH = "api/Tokens/Refresh";

// Router paths
export const ROUTING_AUTH = 'auth';
export const ROUTING_FORBIDDEN = 'forbidden';
export const ROUTING_VERIFY_PHONE = 'verify-phone';
export const ROUTING_CONFIRM_PHONE = 'phone-confirmation';
export const ROUTING_FORGOT_PASSWORD = 'password/forgot-password';
export const ROUTING_RESET_PASSWORD = 'password/reset-password';
export const ROUTING_UPDATE_CONFIRMED = 'password/update-confirmed';
export const ROUTING_MANAGE_TEMPLATES = 'manage-templates';
export const NOT_FOUND = '404';
export const SERVER_ERROR = 'server-error';

