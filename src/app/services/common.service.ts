import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  getSessionData(key: string): any {
    const data = sessionStorage.getItem(key);
    if (data && (data.startsWith('{') || data.startsWith('['))) {
        return JSON.parse(data);
    }
    return data;
}

  createHeader(token: any): any {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  setSessionData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /*postCall(url: string, headers: Headers, object: any): Observable<any> {
    return this.httpClient.post<any>(url, object, {headers});
  }*/
}
