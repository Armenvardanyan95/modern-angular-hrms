import { AsyncPipe, NgComponentOutlet, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeNotAvailableDirective } from 'src/app/shared/directives/employee-not-available.directive';
import { TruncateDirective } from 'src/app/shared/directives/truncate.directive';

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
            <img [ngSrc]="employee.profilePicture" width="20" height="20"/>
            <a [routerLink]="['/employees/details', employee.id]">
              {{ employee.firstName }} {{ employee.lastName }}
            </a>
          </td>
          <td appTruncate [limit]="10">{{ employee.position }}</td>
          <td>
            <button (click)="showConfirmationDialog()">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-container *ngComponentOutlet="confirmDialog"></ng-container>
  `,
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, NgComponentOutlet, RouterLink, TruncateDirective, EmployeeNotAvailableDirective, NgOptimizedImage],
})
export class EmployeeListComponent {
  employeeService = inject(EmployeeService);
  employees$ = this.employeeService.getEmployees();
  isConfirmationOpen = false;
  confirmDialog: any = null;

  async showConfirmationDialog() {
    this.confirmDialog = await import(
      '../../shared/components/confirmation-dialog.component'
    ).then((m) => m.ConfirmationDialogComponent);
    this.isConfirmationOpen = true;
  }
}
