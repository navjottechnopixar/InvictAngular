import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Api } from 'src/app/utils/apis';
import { Router } from '@angular/router';
import { Routes } from 'src/app/shared/routes';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url :string = "assets/json/Contries.json";
  routes: Array<any> = [];
  permissions: Array<any> = [];
  permissionECRD: Array<any> = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  /****************** Request ********************/
  getData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }): Observable<any> {
    const finalParams = params ? { params: this.appendParams(params) } : {};
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.get<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, finalParams);
  }

  postData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }, formData?: boolean): Observable<any> {
   const newPath = path ? this.createPath(url, path) : '';
    const finalParams = formData ? this.appendFormData(params) : params;
   return this.http.post<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, finalParams);
  }

  putData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }): Observable<any> {
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.put<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, params);
  }

  patchData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }): Observable<any> {
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.patch<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, params);
  }

  deteteData(url: string, id: string) {
    return this.http.delete<HttpClient>(environment.BASE_PATH + url + '/' + id);
  }

  /************** Params ****************/
  appendParams(myParams: { [X: string]: any; }): HttpParams {
    let params = new HttpParams();
    for (const key in myParams) {
      if (myParams.hasOwnProperty(key)) {
        params = params.append(key, myParams[key]);
      }
    }
    return params;
  }

  /************ FormData**************/
  appendFormData(myFormData: { [X: string]: any; }): FormData {
    const formData = new FormData();
    for (const key in myFormData) {
      if (myFormData.hasOwnProperty(key)) {
        formData.append(key, myFormData[key]);
      }
    }
    return formData;
  }

  /*****************Crete url with dynamic Id's ********/
  createPath(url: string, path: { [x: string]: any }) {
    let newPath = url;
    for (const key in path) {
      if (path.hasOwnProperty(key)) {
        newPath = (newPath.replace(key, path[key]))
      }
    }
    return newPath;
  }
  allCountries(): Observable<any>{
    console.log(this.url, 'url')
    return this.http.get(this.url);
  }

  /** Get Permission for sub- addmin */
  getRouterValue(routelink:any){
    // this.getData(Api.getPermission, {}).subscribe(response => {
    //   if (response && response.status == 200) {
    //     this.permissions = response.data
    //     console.log(this.permissions)
    //     if (this.permissions.length) {
    //       this.routes = this.routes.map((item,index) => {
           
    //         if (item.sub) {
    //           item.sub = item.sub.map((element: any) => {
    //             this.permissionECRD  = this.getPermissionStatus(element,routelink)
               
    //           })
    //         }else{
    //           this.permissionECRD  = this.getPermissionStatus(item,routelink)
              
    //         }
    //         return this.permissionECRD 
    //       })
    //     }

    //   }
    // })
  }
  private getPermissionStatus(section: any,routelink:any) {
    if(section.routerLink == routelink){
      let model = this.permissions.find(item => item.model.resource == section.value)
      return model;
    }
      
   
  }
}
