import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

// JWT 
import { JwtModule } from '@auth0/angular-jwt';
import { NavService } from './core/services/nav.service';

import { PagesModule } from './modules/pages.module';

import { tokens } from './app.constants';

/**
 * Gets the user's access token for authentication. 
 * @returns The access token stored in local storage.
 */
 export function tokenGetter() {
  return localStorage.getItem(tokens.access);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    MenuListItemComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
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
