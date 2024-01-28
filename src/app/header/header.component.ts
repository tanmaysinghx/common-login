import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedInFlag: boolean = false;
  loggedInUser: any;
  loggedInUserDetails: any;
  token: any;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.getDataFromSession();
  }

  checkLoginStatus() {
    this.token = sessionStorage?.getItem("token") ?? null;
    if (this.token != null) {
      this.loggedInFlag = true;
    } else {
      this.loggedInFlag = false;
    }
  }

  getDataFromSession() {
    this.loggedInUser = sessionStorage?.getItem("loggedInUser");
    this.loggedInUserDetails = sessionStorage?.getItem("userData");
  }

  logout() {
    sessionStorage.clear();
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.router.navigate(['../login']);
  }

  navigateToAuthLogin() {
    this.router.navigate(['../authorization-key-login']);
  }

}
