import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';
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
  }, {
    path: routerPaths.errors,
    loadChildren: () => import('./modules/errors/errors.module')
      .then(m => m.ErrorsModule),
  }, {
    path: routerPaths.church_services,
    loadChildren: () => import('./modules/church-services/church-services.module')
      .then(m => m.ChurchServicesModule),
  }, { 
    path: '**', 
    redirectTo: '/errors/404', 
    pathMatch: 'full' 
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
