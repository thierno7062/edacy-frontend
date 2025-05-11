import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../home/employee.service';
import { HttpErrorService } from '../share/services/http-error.service';
import { AllEmployeeResponse } from '../home/models/all.employee.response';
import { EmployeeRequest } from '../home/models/employee.request';
import { EmployeeResponse } from '../home/models/employee.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-employee.component.html',
  styleUrl: './form-employee.component.css'
})
export class FormEmployeeComponent implements OnInit {

  sectorService: EmployeeService = inject(EmployeeService);
  newSectorForm: FormGroup = this.createSectorForm();
  fb: FormBuilder = inject(FormBuilder);
  sectorRequest: EmployeeRequest = {};
  httpErrorService = inject(HttpErrorService);
  allSectors: AllEmployeeResponse={employee: []};
  @Output() loadAllEmployeesAfterAddEvent = new EventEmitter<AllEmployeeResponse>();

  router = inject(Router);

  ngOnInit() {
    this.newSectorForm = this.initForm();
  }

  private createSectorForm()  {
    return new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      salary: new FormControl(""),
    });
  }
  private initForm() {
    return this.fb.group({
      name: ['', [Validators.required]  /* emailExistValidator(this.sectorService) */],
      email: ['', [Validators.required]],
      salary: ['', [Validators.required]]

    }, {},);
  }

  onSubmit() {
    this.sectorRequest = {
      name: this.newSectorForm.get("name")!.value,
      email: this.newSectorForm.get("email")!.value,
      salary: this.newSectorForm.get("salary")!.value

    }
    this.sectorService.save<EmployeeRequest,EmployeeResponse>('employees', this.sectorRequest).subscribe({
      next: (response) => {
          console.log(this.sectorRequest),
          console.log(response);
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
        },
        complete: () => {
          console.log('save complete');
          this.getAllSectors ();
          this.newSectorForm.reset();
        }

      }
    );
  }

  isValidTouchedOrDirty(fieldName: string) {
    return this.newSectorForm.controls[fieldName].invalid && (this.newSectorForm.controls[fieldName].touched || this.newSectorForm.controls[fieldName].dirty);
  }
  nameIsValidTouchedOrDirty() {
    return this.newSectorForm.controls['name'].invalid && (this.newSectorForm.controls['name'].touched || this.newSectorForm.controls['name'].dirty);
  }
  descriptionIsValidTouchedOrDirty() {
    return this.newSectorForm.controls['email'].invalid && (this.newSectorForm.controls['email'].touched || this.newSectorForm.controls['email'].dirty);
  }
  salaryIsValidTouchedOrDirty() {
    return this.newSectorForm.controls['salary'].invalid && (this.newSectorForm.controls['salary'].touched || this.newSectorForm.controls['salary'].dirty);
  }

  fieldHasError(fieldName: string, errorValue: string) {
    return this.newSectorForm.controls[fieldName].errors?.[errorValue];
  }

  getAllSectors () {
    this.sectorService.all<EmployeeResponse[]>('employees').subscribe({
        next: (response) => {
          this.allSectors.employee = response;
          this.loadAllEmployeesAfterAddEvent.emit(this.allSectors);
        },
        error: (error) => {
          this.httpErrorService.handleError(error);
        },
        complete: () => {
          console.log('getting all sectors after save complete');
        }
      }
    );
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
