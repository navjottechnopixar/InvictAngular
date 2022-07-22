import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Event,NavigationEnd, Router, RouterStateSnapshot, UrlTree,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private http: HttpService,
    private router: Router,
    private admin: AdminService,
  ){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return  this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    
    // if (this.authService.isLoggedIn()) {
    //   const userRole = this.authService.getRole();
    //   if (route.data.role && route.data.role.indexOf(userRole) === -1) {
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
    //   return true;
    // }

    // this.router.navigate(['/home']);
    return false;
  }
  
}