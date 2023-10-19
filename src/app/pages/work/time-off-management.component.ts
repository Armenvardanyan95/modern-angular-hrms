import {
  Component,
  computed,
  effect,
  signal,
  inject,
  Injector,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { TimeOffRequest } from 'src/app/infrastructure/types/time-off-request.type';
import { TimeOffRequestService } from 'src/app/services/time-off-request.service';
import { TimeOffManagementService } from 'src/app/services/time-off-management.service';

@Component({
  selector: 'app-time-off-management',
  template: `
    <h2>Time Off Management</h2>
    <h3>
      Resolved {{ resolvedRequests().length }} /
      {{ requests().length }} Unresolved
    </h3>
    <p>
      <select
        [ngModel]="selectedType()"
        (ngModelChange)="selectedType.set($any($event))"
        placeholder="Filter by request type"
      >
        <option value="">All</option>
        <option value="Vacation">Vacation</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Maternity Leave">Maternity Leave</option>
        <option value="Paternity Leave">Paternity Leave</option>
        <option value="Other">Other</option>
      </select>
    </p>
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Type</th>
          <th>Status</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let request of requests()">
          <td>{{ request.employeeId }}</td>
          <td>{{ request.startDate | date }}</td>
          <td>{{ request.endDate | date }}</td>
          <td>{{ request.type }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.comment }}</td>
          <td>
            <button
              *ngIf="request.status === 'Pending'"
              (click)="approveRequest(request)"
            >
              Approve
            </button>
            <button
              *ngIf="request.status === 'Pending'"
              (click)="rejectRequest(request)"
            >
              Reject
            </button>
            <button (click)="deleteRequest(request)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule],
})
export class TimeOffManagementComponent {
  private readonly timeOffsService = inject(TimeOffManagementService);
  requests = this.timeOffsService.requests;
  resolvedRequests = this.timeOffsService.resolvedRequests;
  selectedType = this.timeOffsService.selectedType;

  approveRequest(request: TimeOffRequest) {
    this.timeOffsService.approveRequest(request);
  }

  rejectRequest(request: TimeOffRequest) {
    this.timeOffsService.rejectRequest(request);
  }

  deleteRequest(request: TimeOffRequest) {
    this.timeOffsService.deleteRequest(request);
  }
}
