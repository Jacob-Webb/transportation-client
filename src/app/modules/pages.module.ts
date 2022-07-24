import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountModule } from './account/account.module';
import { GatheringsModule } from './gatherings/gatherings.module';
import { ErrorsModule } from './errors/errors.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    GatheringsModule,
    ErrorsModule
  ]
})
export class PagesModule { }
