import { Component, Input } from '@angular/core';
import { Employee } from '../../infrastructure/types/employee';

@Component({
  selector: 'app-employee-list',
  template: `
    <div class="employees-container">
      <app-employee *ngFor="let employee of employees" [employee]="employee"></app-employee>
    </div>
  `,
})
export class EmployeeListComponent {
  @Input() employee: Employee[];
}
