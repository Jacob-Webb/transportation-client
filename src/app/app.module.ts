import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './core/header/nav.component';

import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './core/footer/footer.component';
import { NotFoundComponent } from './modules/errors/pages/not-found/not-found.component';
import { ServerErrorComponent } from './modules/errors/pages/server-error/server-error.component';
import { AuthComponent } from './modules/account/auth/auth.component';
import { RegisterComponent } from './modules/account/auth/register/register.component';
import { LoginComponent } from './modules/account/auth/login/login.component';

import { NgxMaskModule } from 'ngx-mask';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { VerifyPhoneComponent } from './modules/account/phone/verify-phone/verify-phone.component';
import { ForgotPasswordComponent } from './modules/account/password/forgot-password/forgot-password.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { ManageTemplatesComponent } from './modules/church-services/manage-templates/manage-templates.component';
import { ForbiddenComponent } from './modules/errors/pages/forbidden/forbidden.component';
import { ResetPasswordComponent } from './modules/account/password/reset-password/reset-password.component';
import { PhoneConfirmationComponent } from './modules/account/phone/phone-confirmation/phone-confirmation.component';

import { UrlService } from './core/services/url.service';

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
    VerifyPhoneComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ManageTemplatesComponent,
    ForbiddenComponent,
    ResetPasswordComponent,
    PhoneConfirmationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
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
