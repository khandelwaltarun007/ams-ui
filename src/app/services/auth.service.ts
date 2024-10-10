import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, switchMap } from 'rxjs';
import { environment } from '../environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string;
  private role: string;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(private router: Router, private httpClient: HttpClient, private userService: UserService) {
    this.checkLoginStatus();
    this.username = '';
    this.role = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): string {
    return this.role;
  }

  login(loginData: Login): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth`, loginData)
      .pipe(
        tap(response => {
          if (response.token) {
            sessionStorage.setItem('userSessionToken', response.token);
            this.username = loginData.username;
            this.loggedIn.next(true);
          }
        }),
        switchMap(() => {
          return this.userService.getUserDetails().pipe(
            tap(userDetails => {
              sessionStorage.setItem('roleName', userDetails.roleName);
              this.role = userDetails.roleName;
            })
          );
        }),
        catchError(error => {
          console.error('Login failed', error);
          throw error;
        })
      );
  }

  checkLoginStatus(): void {
    const token = sessionStorage.getItem('userSessionToken');
    this.loggedIn.next(!!token);
    this.role = sessionStorage.getItem('userRole') || '';
  }

  logout(): void {
    sessionStorage.clear();
    this.loggedIn.next(false);
    this.role = '';
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userSessionToken');
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(this.role);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }
}
