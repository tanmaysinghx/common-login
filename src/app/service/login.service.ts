import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSuccessSubject = new Subject<void>();

  constructor(
    private http: HttpClient,
  ) { }

  getCmsResponseData(): Observable<any> {
    let assetUrl =  environment.cmsUrl + 'assets/data/header-cms.json';
    return this.http.get<any>(assetUrl);
  }

  submitLoginData(payload: any): Observable<any> {
    let assetUrl =  environment.apiUrl + 'generate-token';
    return this.http.post<any>(assetUrl, payload);
  }

  submitRegisterData(payload: any): Observable<any> {
    let assetUrl =  environment.apiUrl + 'user/';
    return this.http.post<any>(assetUrl, payload);
  }

  getUserData(): Observable<any> {
    var token = sessionStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    let assetUrl =  environment.apiUrl + 'current-user';
    return this.http.get<any>(assetUrl, {headers});
  }

  isUsernameAvailable(username: any): Observable<any> {
    let assetUrl =  environment.apiUrl + 'is-username-unique/' + username;
    return this.http.get<any>(assetUrl);
  }
}

