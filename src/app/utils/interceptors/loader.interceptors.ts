import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private admin: AdminService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var index = this.admin.backGroundUrls.indexOf(req.url.toString());

    this.totalRequests++;

    if(index < 0) {
      this.admin.showLoader();
    } else {
      this.admin.backGroundUrls.splice(index, 1);
    }

    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.onEnd();
        }
      }),
      catchError(err => {
        this.onEnd();
        throw err;
      })
    );
  }

  private onEnd() {
    this.totalRequests--;
    setTimeout(() => {
      if (this.totalRequests === 0) {
        this.admin.hideLoader();
      }
    }, 400);
  }

}
