import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../model/UserRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private router: Router, private httpClient: HttpClient) { 
  }

  private baseUrl = environment.baseUrl;
  
  register(userData: UserRequest): Observable<any>{
    console.log('Registering with:', userData.username);
    return this.httpClient.post<any>(`${this.baseUrl}/user`, userData);
  }
}
