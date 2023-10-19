import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { TimeOffRequest } from '../infrastructure/types/time-off-request.type';

@Injectable({
  providedIn: 'root',
})
export class TimeOffRequestService {
  private readonly http = inject(HttpClient);

  getRequests(query = '') {
    return this.http.get<TimeOffRequest[]>('/time-off-requests');
  }

  getRequestsByType(query = '') {
    return this.http.get<TimeOffRequest[]>('/time-off-requests').pipe(
        map((requests) => {
            return query === ''
              ? requests
              : requests.filter((r) => r.type === query);
        }),
    );
  }

  rejectRequest(id: number) {
    return this.http.patch(`/time-off-requests/${id}`, { status: 'Rejected' });
  }

  approveRequest(id: number) {
    return this.http.patch(`/time-off-requests/${id}`, { status: 'Approved' });
  }

  deleteRequest(id: number) {
    return this.http.delete(`/time-off-requests/${id}`);
  }
}