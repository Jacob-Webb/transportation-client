import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { routerPaths } from './app.constants';

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
    loadChildren: () => import('./modules/gatherings/gatherings.module')
      .then(m => m.GatheringsModule),
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
