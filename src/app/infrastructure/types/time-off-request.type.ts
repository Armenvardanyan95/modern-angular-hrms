export type TimeOffRequest = {
    id: number;
    employeeId: number;
    startDate: string;
    endDate: string;
    type: 'Vacation' | 'Sick Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Other';
    status: 'Pending' | 'Approved' | 'Rejected';
    comment?: string;
};