import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
    constructor(private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        if (this.authService.isUserLoggedIn()) {
            console.log("hello");
            return true;
        } else {
            this.router.navigate(['auth/login']);
            return false;
        }


    }
}