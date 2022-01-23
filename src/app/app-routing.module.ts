import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/not-found/not-found.component';
import { AuthComponent } from './modules/account/auth/auth.component';
import { ServerErrorComponent } from './modules/errors/server-error/server-error.component';
import { VerifyPhoneComponent } from './modules/account/phone/verify-phone/verify-phone.component';
import { PhoneConfirmationComponent } from './modules/account/phone/phone-confirmation/phone-confirmation.component';
import { ForgotPasswordComponent } from './modules/account/password/forgot-password/forgot-password.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';
import { ForbiddenComponent } from './modules/errors/forbidden/forbidden.component';
import { ResetPasswordComponent } from './modules/account/password/reset-password/reset-password.component';
import { UpdatedPasswordComponent } from './modules/account/password/updated-password/updated-password.component';
import { routerPaths } from './app.constants';
import { Roles } from './shared/models/roles';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  }, { 
    path: routerPaths.account,
    loadChildren: () => import('./modules/account/account.module')
      .then(m => m.AccountModule),
  },
  // { path: routerPaths.access, component: AuthComponent },
  { path: routerPaths.forbidden, component: ForbiddenComponent },
  // { path: routerPaths.verifyPhone, component: VerifyPhoneComponent },
  // { path: routerPaths.confirmPhone, component: PhoneConfirmationComponent },
  { path: 'password', redirectTo: '/', pathMatch: 'full' },
  // { path: routerPaths.forgotPassword, component: ForgotPasswordComponent },
  // { path: routerPaths.resetPassword, component: ResetPasswordComponent },
  // { path: routerPaths.updatedPassword, component: UpdatedPasswordComponent },
  { 
    path: routerPaths.manageTemplates, 
    component: ManageTemplatesComponent, 
    canActivate: [AuthGuard],
    data: { roles: [Roles.administrator, Roles.superAdmin] }
  },
  { path: routerPaths.notFound, component: NotFoundComponent },
  { path: routerPaths.serverError, component: ServerErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
