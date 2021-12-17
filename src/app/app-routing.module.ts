import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/pages/not-found/not-found.component';
import { AuthComponent } from './modules/account/auth/auth.component';
import { ServerErrorComponent } from './modules/errors/pages/server-error/server-error.component';
import { VerifyPhoneComponent } from './modules/account/phone/verify-phone/verify-phone.component';
import { PhoneConfirmationComponent } from './modules/account/phone/phone-confirmation/phone-confirmation.component';
import { ForgotPasswordComponent } from './modules/account/password/forgot-password/forgot-password.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';
import { ForbiddenComponent } from './modules/errors/pages/forbidden/forbidden.component';
import { AdminGuard } from './core/guards/admin.guard';
import { ResetPasswordComponent } from './modules/account/password/reset-password/reset-password.component';
import { NOT_FOUND, ROUTING_AUTH, ROUTING_CONFIRM_PHONE, ROUTING_FORBIDDEN, ROUTING_FORGOT_PASSWORD, ROUTING_MANAGE_TEMPLATES, ROUTING_UPDATE_CONFIRMED, ROUTING_RESET_PASSWORD, ROUTING_VERIFY_PHONE, SERVER_ERROR } from './app.constants';
import { UpdateConfirmedComponent } from './modules/account/password/update-confirmed/update-confirmed.component';
import { PasswordComponent } from './modules/account/password/password.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: ROUTING_AUTH, component: AuthComponent },
  { path: ROUTING_FORBIDDEN, component: ForbiddenComponent },
  { path: ROUTING_VERIFY_PHONE, component: VerifyPhoneComponent },
  { path: ROUTING_CONFIRM_PHONE, component: PhoneConfirmationComponent },
  { 
    path: 'password', 
    component: PasswordComponent,
    children: [
      { path: ROUTING_FORGOT_PASSWORD, component: ForgotPasswordComponent },
      { path: ROUTING_RESET_PASSWORD, component: ResetPasswordComponent },
      { path: ROUTING_UPDATE_CONFIRMED, component: UpdateConfirmedComponent }
    ]
  },
  { path: ROUTING_UPDATE_CONFIRMED, component: UpdateConfirmedComponent},
  { path: ROUTING_MANAGE_TEMPLATES, component: ManageTemplatesComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: NOT_FOUND, component: NotFoundComponent },
  { path: SERVER_ERROR, component: ServerErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
