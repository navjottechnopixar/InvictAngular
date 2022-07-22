import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public backGroundUrls: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private cookie: CookieService,
    private message: MessagingService) {

    /********* Check JSON parse error on fetching currentUser from local storage **********/
    let _user = this.getLocalData('slayAndDash_user', true);
    this.currentUserSubject = new BehaviorSubject<any>(_user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /********* Get the current value of the logged in user **********/
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /********* Store user details in local storage to keep user logged in between page refreshes **********/
  userSession(user: any) {
    this.setLocalData('slayAndDash_user', user, true);
    this.setLocalData('userToken', user.token, true);
    this.setLocalData('loginUserId', user.id, true);
    if(user.mainRole){
      this.setLocalData('roleType', user.mainRole, true);
      this.setLocalData('roles', user.roleType, true);
    }
    else{
      this.setLocalData('roleType', user.roleType, true);
    }
    // this.setLocalData('roleType', user.roleType, true);
    this.currentUserSubject.next(user);
    this.message.toast('success', 'Logged in Successfullly');
    this.toHome();
  }

  /********* Get the current user token **********/
  public get userToken() {
    let currentUserToken = localStorage.getItem('userToken')
    if (!!currentUserToken) return JSON.parse(currentUserToken);
    // if (!!this.currentUserValue) return this.currentUserValue.accessToken;
  }

  /********* Logout User **********/
  logout() {
    this.removeUser();
  }

  /********* remove user from local storage to log user out and navigate to login **********/
  removeUser() {
    localStorage.removeItem('slayAndDash_user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('roleType');
    localStorage.removeItem('roles');
    localStorage.removeItem('resetCode');

    if (!!this.currentUserSubject) this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

  /********* Fetch Permissions from cookies **********/
  // getPermissions(): any {
  //   const cookieExists: boolean = this.cookie.check('permissions');
  //   if (cookieExists) {
  //     let permissions: any = JSON.parse(this.cookie.get('permissions'));
  //     return permissions;
  //   } else return null;
  // }

  /********* Remove permissions from cookies **********/
  // removePermissions() {
  //   const cookieExists: boolean = this.cookie.check('permissions');
  //   if (cookieExists) this.cookie.delete('permissions');
  // }

  /********* Fetch the current activated route **********/
  currentRoute(): Observable<ActivatedRouteSnapshot> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route.snapshot),
      map((route: ActivatedRouteSnapshot) => {
        while (route.firstChild) {
          if(route.firstChild) route = route.firstChild ;
        }
        return route;
      }));
  }

  /********* Set data in local storage **********/
  setLocalData(key: string, data: any, json?: boolean) {
    localStorage.setItem(key, json ? JSON.stringify(data) : data);
  }

  /********* Get data from local storage **********/
  getLocalData(key: string, json?: boolean) {
    let _data: any ;
    try {
      _data =  localStorage.getItem(key);
      if(json) {
        _data =  JSON.parse(_data);
      }
      return _data;
    } catch (error) {
      if (error instanceof SyntaxError) this.clearLocalData(key);
      return null;
    }
  }

  /********* Remove data from local storage **********/
  clearLocalData(key: string) {
    localStorage.removeItem(key);
  }

  /********* Naviaget to home **********/
  toHome() {
    // const permissions: any = this.getPermissions();
    // if (!!permissions) {
    //   let permissionArr = Object.keys(permissions);
    //   for (let route of Routes) {
    //     if (permissionArr.includes(route.acl)) {
    //       this.router.navigate([route.routerLink]);
    //       break;
    //     }
    //   }
    // }
    //
    this.router.navigate([this.getDashboardPath()]);
  }

  getDashboardPath(){
    let path = '';
    let roleType = this.getLocalData('roleType', true);
    switch (roleType) {
      case 'SuperAdmin':
        path = 'superAdmin/dashboard'
        break;
      case 'Master':
        path = 'master/dashboard'
        break;
      case 'Supervisor':
        path = 'supervisor/dashboard'
        break;
      case 'Auditor':
        path = 'auditor/dashboard'
        break;
      case 'Viewer':
        path = 'Viewer/dashboard'
        break;
      default:
        break;
    }
    return path;
  }


  /********* Share data between siblings through observable **********/
  private dataSource: BehaviorSubject<any> = new BehaviorSubject(null);
  getData: Observable<any> = this.dataSource.asObservable();
  setData(data: any) {
    this.dataSource.next(data);
  }

  /********* Loader control **********/
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loaderState = this.loaderSubject.asObservable();

  showLoader() {
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loaderSubject.next(false);
  }
}
