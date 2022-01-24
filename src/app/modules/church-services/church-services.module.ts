import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { ChurchServicesRoutingModule } from './church-services-routing.module';
import { ManageTemplatesComponent } from './manage-templates/manage-templates.component';


@NgModule({
  declarations: [
    ManageTemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChurchServicesRoutingModule
  ]
})
export class ChurchServicesModule { }
