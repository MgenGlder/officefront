import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root'}) // Service will be available to any module that is in the root
// scope automagically. No need to import, be careful of this though.
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('in the activated route method');
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
