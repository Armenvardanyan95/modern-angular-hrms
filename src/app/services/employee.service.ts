import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../infrastructure/types/employee';

@Injectable()
export class EmployeeService {

    constructor(
        private http: HttpClient,
    ) { }

    getEmployees() {
        return this.http.get<Employee[]>('/employees');
    }

    getEmployee(id: number) {
        return this.http.get<Employee>(`/employees/${id}`);
    }
}