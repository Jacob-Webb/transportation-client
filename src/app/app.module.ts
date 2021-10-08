import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './core/header/nav.component';

import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './core/footer/footer.component';
import { NotFoundComponent } from './modules/errors/pages/errors/not-found/not-found.component';
import { ServerErrorComponent } from './modules/errors/pages/errors/server-error/server-error.component';
import { AccessComponent } from './modules/access/pages/access/access.component';
import { RegisterComponent } from './modules/access/pages/access/register/register.component';
import { SigninComponent } from './modules/access/pages/access/signin/signin.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

import { NgxMaskModule } from 'ngx-mask';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AccessComponent,
    RegisterComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
