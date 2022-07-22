import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Event,NavigationEnd, Router, RouterStateSnapshot, UrlTree,CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Api } from 'src/app/utils/apis';
import { Routes } from 'src/app/shared/routes';
import { HttpService } from 'src/app/services/http.service';
import { AdminService } from 'src/app/services/admin.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  /** Sub-admin permissions variable */
  permissionECRD: Array<any> = [];
  Allpermissions: Array<any> = [];
  Allroutes: Array<any> = [];
  permissionPages: boolean = false;
  currentRoute: any;
  constructor(
    private http: HttpService,
    private router: Router,
    private admin: AdminService,
  ){
    
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.Allroutes = Routes;
     // console.log(state.url);
      this.currentRoute = state.url.replace('/','');

        //console.log(this.currentRoute);
        this.getRouterValue(this.currentRoute)
        let _user = this.admin.getLocalData('slayAndDash_user', true);
        console.log(_user)
      if (_user.permissions.length == 0){
        console.log(_user)
        return true;
      } else{
        return this.isAuthenticated()
        .then(
          (authenticated: any) => {
            console.log('subadmin',this.permissionPages)
            if (authenticated) {
              return true;
            } else {
              this.router.navigate(['/404']);
              return false;
            }
          }
        );
    }
      
}
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.permissionPages);
        }, 1000);
      }
    );
    return promise;
  }
  /** get sub users permissions */
getRouterValue(routLink:any){
}
getPermissionStatus(section: any,routelink:any) {
  if(section.routerLink == routelink){
      this.permissionPages = true;
      console.log(section.routerLink,routelink,this.permissionPages)
  }
  
}
  
}
