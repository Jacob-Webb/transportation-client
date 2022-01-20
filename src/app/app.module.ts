import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './core/menu/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SidebarComponent } from './core/menu/sidebar/sidebar.component';
import { MenuListItemComponent } from './core/menu/menu-list-item/menu-list-item.component';

import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';

import { NavService } from './core/services/nav.service';

import { PagesModule } from './modules/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    ManageTemplatesComponent,
    MenuListItemComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    PagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
