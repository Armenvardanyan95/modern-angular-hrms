import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { TimeOffRequest } from '../infrastructure/types/time-off-request.type';
import { TimeOffManagementService } from './time-off-management.service';
import { TimeOffRequestService } from './time-off-request.service';

const mockRequests: TimeOffRequest[] = [
    {
        id: 1,
        type: 'Vacation',
        status: 'Pending',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        employeeId: 1,
    },
    {
        id: 2,
        type: 'Sick Leave',
        status: 'Pending',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        employeeId: 1,
    },
];

const MockTimeOffRequestService: Partial<TimeOffRequestService> = {
    getRequestsByType: jest.fn().mockReturnValue(of(mockRequests)),
    approveRequest: jest.fn().mockImplementation((id) => {
        const request = mockRequests.find((r) => r.id === id);
        if (request) {
            request.status = 'Approved';
        }
        return of({});
    }),
    rejectRequest: jest.fn().mockImplementation((id) => {
        const request = mockRequests.find((r) => r.id === id);
        if (request) {
            request.status = 'Rejected';
        }
        return of({});
    }),
    deleteRequest: jest.fn().mockImplementation((id) => {
        const index = mockRequests.findIndex((r) => r.id === id);
        if (index !== -1) {
            mockRequests.splice(index, 1);
        }
        return of({});
    }),
};

let localStorageMock: Pick<Storage, 'getItem' | 'setItem'>;
let selectedType = '';

let service: TimeOffManagementService;

@Component({
    selector: 'app-stub',
    template: '',
    standalone: true,
})
export class StubComponent {
    constructor(private readonly service: TimeOffManagementService) {}
}

describe('TimeOffManagementService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MockProvider(TimeOffRequestService, MockTimeOffRequestService)],
            imports: [StubComponent],
        });
        localStorageMock = {
          getItem: jest.fn().mockReturnValue(() => selectedType),
          setItem: jest.fn().mockImplementation((key, value) => {
            selectedType = value;
          })
        };
        Object.defineProperty(window, 'localStorage', {
          value: localStorageMock,
        });
        service = TestBed.inject(TimeOffManagementService);
    });

    it('should be successfully instantiated', () => {
        expect(service).toBeTruthy();
    });

    it('should have all requests loaded initially', () => {
        const fixture = TestBed.createComponent(StubComponent);
        fixture.detectChanges();
        expect(service.requests()).toEqual(mockRequests);
    });

    it('should update requests when approved', () => {
        const fixture = TestBed.createComponent(StubComponent);
        service.approveRequest(mockRequests[0]);
        fixture.detectChanges();
        expect(service.requests()[0].status).toEqual('Approved');
    });

    it('should update requests when rejected', () => {
      const fixture = TestBed.createComponent(StubComponent);
      service.rejectRequest(mockRequests[0]);
      fixture.detectChanges();
      expect(service.requests()[0].status).toEqual('Rejected');
      expect(service.resolvedRequests()).toEqual([mockRequests[0]]);
    });

    it('should write the values in localStorage when selectedType has changed', () => {
        const fixture = TestBed.createComponent(StubComponent);
        service.selectedType.set('Vacation');
        fixture.detectChanges();
        expect(selectedType).toBe('Vacation');
    });
});