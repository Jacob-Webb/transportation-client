import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { AccountRoutingModule } from './account-routing.module';
import { AuthComponent } from './auth/auth.component'
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { UpdatedPasswordComponent } from './password/updated-password/updated-password.component';
import { PhoneConfirmationComponent } from './phone/phone-confirmation/phone-confirmation.component';
import { VerifyPhoneComponent } from './phone/verify-phone/verify-phone.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UpdatedPasswordComponent,
    PhoneConfirmationComponent,
    VerifyPhoneComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
