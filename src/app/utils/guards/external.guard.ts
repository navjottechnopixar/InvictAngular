import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalGuard implements CanActivate {

  constructor(
    private admin: AdminService
    ) { }

  /*************** External Routing guard *************/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.admin.userToken) { return true; }
    this.admin.toHome();
    return false;
  }
}
