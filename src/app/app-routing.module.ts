import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/errors/pages/errors/not-found/not-found.component';
import { AccessComponent } from './modules/access/pages/access/access.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { ServerErrorComponent } from './modules/errors/pages/errors/server-error/server-error.component';
import { VerifyPhoneComponent } from './modules/verify-phone/pages/verify-phone/verify-phone.component';

const routes: Routes = [
  { path: '', component: AccessComponent },
  { path: 'access', component: AccessComponent },
  { path: 'access/:token', component: AccessComponent },
  { path: 'verify-phone', component: VerifyPhoneComponent},
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
