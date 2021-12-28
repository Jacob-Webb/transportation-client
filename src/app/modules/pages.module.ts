import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountModule } from './account/account.module';
import { ErrorsModule } from './errors/errors.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountModule,
    ErrorsModule
  ]
})
export class PagesModule { }
