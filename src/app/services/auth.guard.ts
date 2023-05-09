import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isAuthenticated().pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated || localStorage.getItem('token') === null) {
                    this.router.navigate(['/login']);
                }
            }) //TODO
        );
    }
}
