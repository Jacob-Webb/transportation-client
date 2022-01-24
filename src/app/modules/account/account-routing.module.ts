import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component'
import { ForgotPasswordComponent } from './password/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { UpdatedPasswordComponent } from './password/updated-password/updated-password.component';
import { PhoneConfirmationComponent } from './phone/phone-confirmation/phone-confirmation.component';
import { VerifyPhoneComponent } from './phone/verify-phone/verify-phone.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      {
        path: 'access',
        component: AuthComponent
      }, { 
        path: 'verify-phone', 
        component: VerifyPhoneComponent 
      }, { 
        path: 'phone-confirmation', 
        component: PhoneConfirmationComponent 
      }, { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent 
      }, { 
        path: 'reset-password', 
        component: ResetPasswordComponent 
      }, { 
        path: 'password-updated', 
        component: UpdatedPasswordComponent 
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }