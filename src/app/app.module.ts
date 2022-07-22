import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './utils/guards/auth.guard';
import { ExternalGuard } from './utils/guards/external.guard';

import { ErrorInterceptor } from './utils/interceptors/error.interceptor';
import { JwtInterceptor } from './utils/interceptors/jwt.interceptor';
import { LoaderInterceptor } from './utils/interceptors/loader.interceptors';
import { LoginComponent } from './authorization/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './utils/loader/loader.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    AuthGuard,
    ExternalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
