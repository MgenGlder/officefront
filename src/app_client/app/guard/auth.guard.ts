import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root'}) // Service will be available to any module that is in the root
// scope automagically. No need to import, be careful of this though.
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const helper = new JwtHelperService();
        if (localStorage.getItem('currentUser') || localStorage.getItem('currentUser') == 'null') {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            const decodedToken = helper.decodeToken(token);
            const expiredDate = helper.getTokenExpirationDate(token);
            const isExpired = helper.isTokenExpired(token);
            console.log(expiredDate);
            console.log(isExpired);
            console.log(decodedToken);
            return true;
        }

        this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
