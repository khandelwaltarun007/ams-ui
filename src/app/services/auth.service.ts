import { Injectable } from '@angular/core';
import { Login } from '../login/Login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string;
  
  constructor(private router: Router, private httpClient: HttpClient) { 
    this.username = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  private baseUrl = environment.baseUrl;
  
  authenticate(loginData: Login) : Observable<any> {
    console.log('Logging in with:', loginData.username, loginData.password);
    this.username = loginData.username;
    return this.httpClient.post<any>(`${this.baseUrl}/auth`, loginData);
  }

  getSessionData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
