import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string;
  
  constructor(private router: Router, private httpClient: HttpClient, private commonService: CommonService) { 
    this.username = '';
  }

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  private baseUrl = environment.baseUrl;
  
  getUserDetails() : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers.get('Authorization'));
    return this.httpClient.get<any>(`${this.baseUrl}/user/details`, { headers });
  }
}
