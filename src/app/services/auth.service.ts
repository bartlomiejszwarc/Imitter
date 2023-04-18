import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, map, of, Subject, switchMap } from 'rxjs';
import * as moment from 'moment';
import { User } from '../objects/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  signupApi = 'http://localhost:3000/signup';
  loginApi = 'http://localhost:3000/login';
  loginErrorMessage!: string;
  registerMessage!: string;
  user!: any;
  userId!: string;
  invokeGetUserData = new EventEmitter();

  async getUserData() {
    return firstValueFrom(this.getUserById());
  }

  getUserById() {
    return this.http.get<{ userData: string }>('http://localhost:3000/me/' + localStorage.getItem('token')).pipe(
      switchMap((res) => this.getUser(res.userData.replace(/"/g, ''))),
      map((res) => (this.user = res))
    );
  }

  getUser(id: string) {
    return this.http.get('http://localhost:3000/userdata/' + id);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
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
      .subscribe((response) => {
        this.setSession(response);
        this.getUserById();
        this.router.navigate(['/dashboard']);
      });
  }
  logout() {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
}
