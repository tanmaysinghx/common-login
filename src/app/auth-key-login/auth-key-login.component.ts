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
  selector: 'app-auth-key-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './auth-key-login.component.html',
  styleUrl: './auth-key-login.component.scss'
})
export class AuthKeyLoginComponent {
  cmsResponse: any;
  authForm!: FormGroup;
  authFormPayload: any;
  authorityKey: any;
  snackbarMessage: any;
  errorFlag: boolean = false;
  successFlag: boolean = false;
  keyData: any;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkauthStatus();
    this.getCmsResponse();
    this.createAuthForm();
  }

  checkauthStatus() {
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

  createAuthForm() {
    this.authForm = new FormGroup({
      authorizationKey: new FormControl(''),
      token: new FormControl('')
    });
  }

  createAuthPayload() {
    this.authFormPayload = {
      "authorizationKey": this.authForm.controls['authorizationKey'].value,
      "token": this.authForm.controls['token'].value
    }
  }

  submitAuthForm() {
    if (this.authForm.valid) {
      this.createAuthPayload();
      if (this.authFormPayload.authorizationKey != "" || this.authFormPayload.token != "") {
        if (this.authFormPayload.authorizationKey != "") {
          this.checkKeyValue(this.authFormPayload.authorizationKey);
        } else if (this.authFormPayload.token != "") {
          /* Implementation pending */
          this.openSnackbar("Please use auth key method!", "error");
        }
      } else {
        this.openSnackbar("Please enter value to continue!", "error");
      }
    }
  }

  checkKeyValue(key: any) {
    console.log(key);
    this.loginService.getAuthKeyValues().subscribe((data) => {
      this.keyData = data;
      if (this.keyData.productKeys.includes(this.authFormPayload.authorizationKey)) {
        this.setHardCodedTokens();
        this.openSnackbar("Login Successfull", "success");
        setTimeout(() => this.navigateToDashboard(), 5000);
      } else {
        this.openSnackbar("Wrong authorization key", "error");
      }
    })
  }

  setHardCodedTokens() {
    sessionStorage.setItem('loggedInUser', "Tester" + " " + "5551");
    sessionStorage.setItem('loggedInUserEmailId', "dummyTester@gmail.com");
    sessionStorage.setItem('username', "dummyTester5551");
    sessionStorage.setItem('token', "ggsgdgggfgfgffggfgffdbdddbddffgdhgbddbdb");
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
