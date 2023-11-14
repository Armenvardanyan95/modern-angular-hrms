import { signal, computed } from '@angular/core';
import { RenderResult, render, fireEvent } from '@testing-library/angular';
import { TimeOffRequest } from 'src/app/infrastructure/types/time-off-request.type';
import { TimeOffManagementService } from 'src/app/services/time-off-management.service';
import { TimeOffManagementComponent } from './time-off-management.component';
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
const MockTimeOffManagementService: any = {
    requests: signal(mockRequests),
    selectedType: signal(''),
    resolvedRequests: computed(() => {
        return MockTimeOffManagementService.requests().filter(
            (r: TimeOffRequest) => r.status !== 'Pending',
        );
    }),

    approveRequest: jest.fn().mockImplementation((request) => {
        const index = mockRequests.findIndex((r) => r.id === request.id);
        if (index !== -1) {
            mockRequests[index].status = 'Approved';
        }
        MockTimeOffManagementService.requests.set(mockRequests);
    }),

    rejectRequest: jest.fn().mockImplementation((request) => {
        const index = mockRequests.findIndex((r) => r.id === request.id);
        if (index !== -1) {
            mockRequests[index].status = 'Rejected';
        }
        MockTimeOffManagementService.requests.set(mockRequests);
    }),

    deleteRequest: jest.fn().mockImplementation((request) => {
        const index = mockRequests.findIndex((r) => r.id === request.id);
        if (index !== -1) {
            mockRequests.splice(index, 1);
        }
        MockTimeOffManagementService.requests.set(mockRequests);
    }),
} as const;

let component: RenderResult<TimeOffManagementComponent>;

describe('TimeOffManagementComponent', () => {
    beforeEach(async () => {
        component = await render(TimeOffManagementComponent, {
            providers: [
                {
                    provide: TimeOffManagementService,
                    useValue: MockTimeOffManagementService,
                },
            ],
        });
    });

    it('should render the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the requests', () => {
        expect(component.getAllByRole('row').length).toEqual(3);
    });

    it('should update the UI with new buttons if a request is approved', () => {
        const approveButton = component.getAllByText('Approve')[0];
        fireEvent.click(approveButton);
        expect(component.getAllByText('Approve').length).toEqual(1);
        expect(component.getAllByText('Reject').length).toEqual(1);
    });
});