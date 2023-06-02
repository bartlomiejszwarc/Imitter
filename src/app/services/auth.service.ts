import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    BehaviorSubject,
    catchError,
    firstValueFrom,
    lastValueFrom,
    map,
    Observable,
    of,
    Subject,
    switchMap,
    tap,
    throwError,
} from 'rxjs';
import * as moment from 'moment';
import { User } from '../objects/User';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router, private http: HttpClient) {}
    signupApi = 'http://localhost:3000/api/signup';
    loginApi = 'http://localhost:3000/api/login';
    meApi = 'http://localhost:3000/api/me/';
    userdataApi = 'http://localhost:3000/api/userdata/';
    loginErrorMessage!: string;
    registerMessage!: string;
    user!: any;
    userId!: string;
    isAuth: boolean = false;

    async getUserData() {
        //if (this.isAuth) {
        return lastValueFrom(this.getUserById());
        //}
        // return undefined;
    }

    getUserById() {
        return this.http.get<{ userData: string }>(this.meApi + localStorage.getItem('token')).pipe(
            switchMap((res) => this.getUser(res.userData.replace(/"/g, ''))),
            map((res) => (this.user = res))
        );
    }

    getUser(id: string) {
        return this.http.get(this.userdataApi + id);
    }
    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    isAuthenticated(): Observable<boolean> {
        if (localStorage.getItem('token') === null) {
            return of(false);
        }
        return this.http.get(this.meApi + localStorage.getItem('token')).pipe(
            map((res: any) => {
                this.isAuth = res.isAuth;
                return this.isAuth;
            })
        );
    }

    register(username: string, password: string, displayName: string, profilePicture?: HTMLInputElement) {
        const user = {
            username: username,
            password: password,
            displayName: displayName,
            profilePicture: profilePicture,
            joinDate: new Date(),
        };
        this.http.post(this.signupApi, user).subscribe({
            next: () => {
                this.router.navigate(['/login']);
            },
            error: (err) => {
                this.registerMessage = err.error.error;
            },
        });
    }

    private setSession(authResult: any) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration!);
        return moment(expiresAt);
    }

    login(username: string, password: string) {
        const loginBody = {
            username: username,
            password: password,
        };
        this.http
            .post<{
                token: string;
                expiresIn: number;
                user: string;
                message: string;
            }>(this.loginApi, loginBody)
            .subscribe({
                next: (response) => {
                    this.setSession(response);
                    this.getUserById();
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    this.loginErrorMessage = err.error.message;
                },
            });
    }
    logout() {
        this.clearAuthData();
        this.router.navigate(['/login']);
    }
}
