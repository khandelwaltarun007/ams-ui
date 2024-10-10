import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CommonService } from './common.service';
import { Attendance } from '../model/Attendance';
import { AttendanceCalculationResponse } from '../model/AttendanceCalculationResponse';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  
  constructor(private router: Router, private httpClient: HttpClient, private commonService: CommonService) { }

  private baseUrl = environment.baseUrl;
  
  getAttendances(page: number, size: number) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.get<any>(`${this.baseUrl}/attendance?page=${page}&size=${size}`, { headers });
  }

  getAttendancesByUserId(userId: number, page: number, size: number) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.get<any>(`${this.baseUrl}/attendance/user/${userId}?page=${page}&size=${size}`, { headers });
  }

  addAttendance(attendanceData: any) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.post<any>(`${this.baseUrl}/attendance`, attendanceData, {headers});
  }

  getAttendancesByManagerUserName(managerUsername: string, status: string, page: number, size: number) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.get<any>(`${this.baseUrl}/attendance/filter?status=${status}&username=${managerUsername}&page=${page}&size=${size}`, {headers});
  }

  updateAttendance(attendance: Attendance) : Observable<any> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.post<any>(`${this.baseUrl}/attendance/${attendance.userId}/date/${attendance.date}/status/${attendance.status}/comments/${attendance.comment}`, attendance, {headers});
  }

  getAttendanceCalculation(userId: number): Observable<AttendanceCalculationResponse> {
    const token = this.commonService.getSessionData('userSessionToken');
    const headers = this.commonService.createHeader(token);
    return this.httpClient.post<AttendanceCalculationResponse>(`${this.baseUrl}/attendance-calculation`, userId, {headers});
  }
}
