import {
  AsyncPipe,
  NgComponentOutlet,
  NgFor,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeNotAvailableDirective } from 'src/app/shared/directives/employee-not-available.directive';
import { TruncateDirective } from 'src/app/shared/directives/truncate.directive';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog.component';

@Component({
  selector: 'app-employee-list',
  template: `
    <h2>Employee List</h2>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees$ | async">
          <td>
            <img [ngSrc]="employee.profilePicture" width="20" height="20" />
            <a [routerLink]="['/employees/details', employee.id]">
              {{ employee.firstName }} {{ employee.lastName }}
            </a>
          </td>
          <td appTruncate [limit]="10">{{ employee.position }}</td>
          <td>
            <button (click)="isConfirmationOpen = true" #deleteButton>
              Delete
            </button>
            @defer (on interaction(deleteButton)) {
              <app-confirmation-dialog
                [isConfirmationOpen]="isConfirmationOpen"
              />
            }
          </td>
        </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    NgComponentOutlet,
    RouterLink,
    TruncateDirective,
    EmployeeNotAvailableDirective,
    NgOptimizedImage,
    ConfirmationDialogComponent,
  ],
})
export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();
  isConfirmationOpen = false;
}
