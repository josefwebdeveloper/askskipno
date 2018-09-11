import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService, UserService } from '../_services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       const currUser=localStorage.getItem('currentUser');
        if (currUser&&currUser!=undefined) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.userService.getToken();
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
       
        return false;
    }
}