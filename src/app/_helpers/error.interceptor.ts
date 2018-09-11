import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { AuthenticationService } from '../_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            if (err.status === 404) {
                console.log("404");
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/login']);
                location.reload(true);
            }
            
            // if (err.status === 400) {
            //     // auto logout if 401 response returned from api
            //     this.authenticationService.logout();
            //     // location.reload(true);
            // }
            
            const error = err.error.message || err.statusText;
            console.log("errorsinterseptor",error);
            return throwError(error);
        }))
    }
}