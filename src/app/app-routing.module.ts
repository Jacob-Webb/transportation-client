import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/pages/errors/not-found/not-found.component';
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { ServerErrorComponent } from './modules/errors/pages/errors/server-error/server-error.component';
import { VerifyPhoneComponent } from './modules/verify-phone/pages/verify-phone/verify-phone.component';
import { PhoneVerificationConfirmationComponent } from './modules/verify-phone/pages/phone-verification-confirmation/phone-verification-confirmation.component';
import { ForgotPasswordComponent } from './modules/password/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'access', component: AuthComponent },
  { path: 'verify-phone', component: VerifyPhoneComponent},
  { path: 'phone-verification-confirmation', component: PhoneVerificationConfirmationComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'home', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
