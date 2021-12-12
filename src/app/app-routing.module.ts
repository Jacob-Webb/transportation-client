import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/pages/not-found/not-found.component';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { ServerErrorComponent } from './modules/errors/pages/server-error/server-error.component';
import { VerifyPhoneComponent } from './modules/auth/pages/verify-phone/verify-phone.component';
import { PhoneConfirmationComponent } from './modules/auth/pages/phone-confirmation/phone-confirmation.component';
import { ForgotPasswordComponent } from './modules/auth/pages/password/forgot-password/forgot-password.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';
import { ForbiddenComponent } from './modules/errors/pages/forbidden/forbidden.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'verify-phone', component: VerifyPhoneComponent },
  { path: 'phone-confirmation', component: PhoneConfirmationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'manage-templates', component: ManageTemplatesComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: '404', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
