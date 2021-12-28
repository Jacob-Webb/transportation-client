import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './core/header/nav.component';
import { FooterComponent } from './core/footer/footer.component';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';

import { UrlService } from './core/services/url.service';

import { PagesModule } from './modules/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    DashboardComponent,
    ManageTemplatesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },  
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
