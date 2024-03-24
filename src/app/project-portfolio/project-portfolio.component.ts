import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from "../footer/footer.component";
import { MainService } from '../service/main.service';

@Component({
  selector: 'app-project-portfolio',
  standalone: true,
  templateUrl: './project-portfolio.component.html',
  styleUrl: './project-portfolio.component.scss',
  imports: [CommonModule, MatCardModule, FooterComponent]
})
export class ProjectPortfolioComponent {

  apiData: any;
  errorFlag: boolean = false;
  successFlag: boolean = false;
  snackbarMessage: any;
  jwtToken: any;

  constructor(
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.getApiData();
    this.getDataFromSession();
  }

  getDataFromSession() {
    this.jwtToken = localStorage.getItem("jwt-token");
  }

  getApiData() {
    this.mainService.getApplications().subscribe((data) => {
      this.apiData = data.data;
      this.checkApplicationAccess();
    })
  }

  checkApplicationAccess() {
    this.mainService.getUserSpecificAccess().subscribe((data) => {
      for (let i = 0; i < this.apiData.length; i++) {
        this.apiData[i].access = false;
        for (let j = 0; j < data.accessList.length; j++) {
          if (this.apiData[i].applicationId === data.accessList[j].applicationId) {
            this.apiData[i].access = data.accessList[j].access;
            break;
          }
        }
      }
    })
  }

  navigateToApplication(event: any, data: any) {
    if (data.access) {
      this.openSnackbar("Application is opening...", "success");
      let appURL = data.appUrl + this.jwtToken;
      console.log(appURL);
      setTimeout(() => window.open(appURL, ''), 5000);
    } else if (!data.access) {
      this.openSnackbar("Access is required!", "error");
    }
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

  closeSnackbar() {
    this.errorFlag = false;
    this.successFlag = true;
  }

  refresh() {
    window.location.reload();
  }
}
