import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MessagingService } from 'src/app/services/messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private admin: AdminService,
    private router: Router,
    private message: MessagingService
    ) { }

  /*************** Layout Routing guard *************/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.admin.userToken) return true;
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    this.message.toast('warning', 'access denied.');
    return false;
  }
}
