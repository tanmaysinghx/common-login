import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-project-portfolio',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './project-portfolio.component.html',
  styleUrl: './project-portfolio.component.scss'
})
export class ProjectPortfolioComponent {


  applications = [
    { name: 'Citrix Gateway', description: 'Description for Citrix Gateway' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    { name: 'ServiceNow', description: 'Description for ServiceNow' },
    // Add more application objects here
  ];
}
