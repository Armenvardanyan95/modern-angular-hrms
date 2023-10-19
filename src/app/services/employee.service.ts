import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../infrastructure/types/employee';

@Injectable()
export class EmployeeService {
    private readonly http = inject(HttpClient);

    getEmployees() {
        return this.http.get<Employee[]>('/employees');
    }

    getEmployee(id: number) {
        return this.http.get<Employee>(`/employees/${id}`);
    }

    createEmployee(employee: Omit<Employee, 'id' | 'isAvailable'>) {
        return this.http.post('/employees', employee);
    }
}