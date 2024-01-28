import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  applicationId: any = 5551;
  apiResponse: any;
  version: any;
  informationMessage: any;
  infoFlag: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAppVersion(this.applicationId);
  }

  /* Function to get version data */
  getAppVersion(applicationId: any) {
    console.log("App Id: ", applicationId);
    this.http.get('assets/data/appVersion.json').subscribe(
      (response) => {
        this.apiResponse = response;
        this.version = this.apiResponse.version;
        this.informationMessage = this.apiResponse.informationMessage;
        if (this.informationMessage != null) {
          this.infoFlag = true;
          this.closeInfoMessage();
        }
      },
      (error) => {
        this.apiResponse = {
          "version": "",
          "applicationId": 5551
        };
      }
    );
  }

  closeInfoMessage() {
    setTimeout(() => this.infoFlag = false, 6000);
  }
}
