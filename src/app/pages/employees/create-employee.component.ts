import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from 'src/app/infrastructure/types/employee';
import { EmployeeForm } from 'src/app/infrastructure/types/employee-form';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  template: `
    <input type="text" placeholder="First Name" [formControl]="form.controls.email" />
  `,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class CreateEmployeeComponent {
  private readonly employeeService = inject(EmployeeService);
  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true}),
    email: new FormControl('', {nonNullable: true}),
    position: new FormControl('', {nonNullable: true}),
    level: new FormControl('', {nonNullable: true}),
  });

  submit() {
    if (this.form.valid) {
      const employee = this.form.value as Employee;
      this.employeeService.createEmployee(employee);
    }
  }
}
