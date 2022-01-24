import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountModule } from './account/account.module';
import { ChurchServicesModule } from './church-services/church-services.module';
import { ErrorsModule } from './errors/errors.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    ChurchServicesModule,
    ErrorsModule
  ]
})
export class PagesModule { }
