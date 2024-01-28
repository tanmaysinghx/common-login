import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  cmsResponse: any;
  loginForm!: FormGroup;
  loginFormPayload: any;
  authorityKey: any;
  snackbarMessage: any;
  errorFlag: boolean = false;
  successFlag: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.getCmsResponse();
    this.createLoginForm();
  }

  checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      this.navigateToDashboard();
    }
  }

  getCmsResponse() {
    this.loginService.getCmsResponseData().subscribe((data) => {
      this.cmsResponse = data;
    })
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  createLoginPayload() {
    this.loginFormPayload = {
      "username": this.loginForm.controls['userName'].value,
      "password": this.loginForm.controls['password'].value
    }
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this.createLoginPayload();
      this.loginService.submitLoginData(this.loginFormPayload).subscribe((data) => {
        if (data) {
          sessionStorage.setItem('token', data.token);
          this.openSnackbar("Login successfull", "success");
          this.getCurrentUser();
          setTimeout(() => this.navigateToDashboard(), 5000);
        }
      }, (error) => {
        console.log("error", error);
        this.openSnackbar("Login error", "error");
      }
      )
    } else {
      this.openSnackbar("Invalid form", "error");
    }
  }

  getCurrentUser() {
    this.loginService.getUserData().subscribe((data) => {
      this.authorityKey = data.authorities[0].authority;
      sessionStorage.setItem('userData', JSON.stringify(data));
      sessionStorage.setItem('loggedInUser', data.firstName + " " + data.lastName);
      sessionStorage.setItem('loggedInUserEmailId', data.email);
      sessionStorage.setItem('username', data.username);
    })
  }

  navigateToDashboard() {
    this.router.navigate(['../project-portfolio']);
  }

  navigateToRegister() {
    this.router.navigate(['../register']);
  }

  openSnackbar(message: any, condition: any) {
    if (condition == "error") {
      this.errorFlag = true;
      setTimeout(() => this.errorFlag = false, 5000);
    } else if (condition == 'success') {
      this.successFlag = true;
      setTimeout(() => this.errorFlag = false, 5000);
    }
    this.snackbarMessage = message;
  }

}
