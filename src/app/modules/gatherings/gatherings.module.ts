import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { GatheringsRoutingModule } from './gatherings-routing.module';
import { ManageTemplatesComponent } from './manage-templates/manage-templates.component';


@NgModule({
  declarations: [
    ManageTemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GatheringsRoutingModule
  ]
})
export class GatheringsModule { }
