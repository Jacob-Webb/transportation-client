import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { Roles } from 'src/app/shared/models/roles';

import { ManageTemplatesComponent } from './manage-templates/manage-templates.component';

const routes: Routes = [
  {
  path: '', 
    children: [
      {
        path: 'manage-templates',
        component: ManageTemplatesComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.administrator, Roles.superAdmin] }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChurchServicesRoutingModule { }
