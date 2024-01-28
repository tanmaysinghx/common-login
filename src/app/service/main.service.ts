import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
  ) { }

  getApplications(): Observable<any> {
    let assetUrl = 'assets/data/project-portfolio.json';
    return this.http.get<any>(assetUrl);
  }

  getUserSpecificAccess(): Observable<any> {
    let assetUrl = 'assets/data/user-access.json';
    return this.http.get<any>(assetUrl);
  }
}
