import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private router: Router, private httpClient: HttpClient, private commonService: CommonService) { }

  
  private baseUrl = environment.baseUrl;
  
  getAttendances(page: number, size: number) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers.get('Authorization'));
    return this.httpClient.get<any>(`${this.baseUrl}/attendance?page=${page}&size=${size}`, { headers });
  }
}
