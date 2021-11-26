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
import { AuthComponent } from './modules/auth/pages/auth/auth.component';
import { RegisterComponent } from './modules/auth/pages/auth/register/register.component';
import { LoginComponent } from './modules/auth/pages/auth/login/login.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

import { NgxMaskModule } from 'ngx-mask';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { VerifyPhoneComponent } from './modules/verify-phone/pages/verify-phone/verify-phone.component';
import { ForgotPasswordComponent } from './modules/password/forgot-password/forgot-password.component';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    VerifyPhoneComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    SharedModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
