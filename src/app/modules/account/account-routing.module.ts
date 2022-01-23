import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component'
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { UpdatedPasswordComponent } from './password/updated-password/updated-password.component';
import { PhoneConfirmationComponent } from './phone/phone-confirmation/phone-confirmation.component';
import { VerifyPhoneComponent } from './phone/verify-phone/verify-phone.component';
import { routerPaths } from 'src/app/app.constants';

const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent
  }, { 
    path: routerPaths.verifyPhone, 
    component: VerifyPhoneComponent 
  }, { 
    path: routerPaths.confirmPhone, 
    component: PhoneConfirmationComponent 
  }, { 
    path: routerPaths.forgotPassword, 
    component: ForgotPasswordComponent 
  }, { 
    path: routerPaths.resetPassword, 
    component: ResetPasswordComponent 
  }, { 
    path: routerPaths.updatedPassword, 
    component: UpdatedPasswordComponent 
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }