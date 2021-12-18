import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { routerPaths } from 'src/app/app.constants';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              let errors: string[] = Object.values(error.error);
              let errorsAsString = errors.join("")
              this.notificationService.showError(errorsAsString, error.statusText);
              break;
            case 401:
              this.notificationService.showError(error.error, error.statusText);
              break;
            case 403: 
              this.notificationService.showError(error.error);
              break;
            case 404:
              this.router.navigateByUrl(routerPaths.notFound);
              break;
            case 406: 
              this.notificationService.showError(error.error);
              break;
            case 409:
              this.notificationService.showError(error.error);
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl(routerPaths.serverError, navigationExtras);
              break;
            default:
              //this.notificationService.showError("Something unexpected went wrong");
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
