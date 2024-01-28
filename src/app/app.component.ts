import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginService } from './service/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptorService } from './api-interceptor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, HttpClientModule, PageNotFoundComponent],
  providers: [LoginService, ApiInterceptorService, MainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ]
})
export class AppComponent {
  title = 'common-login';

  constructor(private loginService: LoginService) {

  }
  ngOnInit(): void {
  
  }
}
