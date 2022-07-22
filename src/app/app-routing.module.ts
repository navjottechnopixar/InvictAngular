import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as auth from '../app/utils/guards/external.guard';

// import { ForgotPasswordComponent } from './authorization/forgot-password/forgot-password.component';
import { LoginComponent } from './authorization/login/login.component';
import { RequestCodeComponent } from './authorization/request-code/request-code.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './authorization/reset-password/reset-password.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [auth.ExternalGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [auth.ExternalGuard] },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
