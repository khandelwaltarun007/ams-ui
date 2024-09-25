import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string;
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();
  
  constructor(private router: Router, private httpClient: HttpClient) { 
    this.checkLoginStatus();
    this.username = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  private baseUrl = environment.baseUrl;
  
  login(loginData: Login) : Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/auth`, loginData)
      .pipe(
        tap(response => {
          if (response.token) { // Assume the response contains a token
            sessionStorage.setItem('userSessionToken', response.token);
            this.username = loginData.username;
            this.loggedIn.next(true);
          }
        })
      );
  }

  getSessionData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  checkLoginStatus(): void {
    const token = sessionStorage.getItem('userSessionToken'); // Or wherever your token is stored
    this.loggedIn.next(!!token);
  }

  logout(): void {
    sessionStorage.clear(); // Remove token on logout
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userSessionToken');
  }
}
