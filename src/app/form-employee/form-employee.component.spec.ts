import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmployeeComponent } from './form-employee.component';

describe('FormEmployeeComponent', () => {
  let component: FormEmployeeComponent;
  let fixture: ComponentFixture<FormEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
