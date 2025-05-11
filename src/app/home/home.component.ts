import { EmployeeResponse } from './models/employee.response';
import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../share/component/header/header.component';
import { EmployeeService } from './employee.service';
import { HttpErrorService } from '../share/services/http-error.service';
import { AllEmployeeResponse } from './models/all.employee.response';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  employee = inject(EmployeeService)
  httpErrorService = inject(HttpErrorService);
  allEmployee: AllEmployeeResponse={employee: []};


  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit() {
    this.employee.all<EmployeeResponse[]>('employees').subscribe({
      next: (response) => {
        console.log(response);
        this.allEmployee.employee = response;
        console.log(this.allEmployee.employee);
      },
      error: (error) => {
        this.httpErrorService.handleError(error);
      },
      complete: () => {
        console.log('complete');
      }
    }
    );
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToForm(){
    this.router.navigate(['/form-employee']);
  }

}
