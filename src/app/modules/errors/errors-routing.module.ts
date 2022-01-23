import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ServerErrorComponent } from './server-error/server-error.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      {
        path: '404',
        component: NotFoundComponent
      }, { 
        path: 'forbidden', 
        component: ForbiddenComponent
      }, { 
        path: 'server-error', 
        component: ServerErrorComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }