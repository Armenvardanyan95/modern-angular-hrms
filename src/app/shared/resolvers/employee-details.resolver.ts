import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Employee } from 'src/app/infrastructure/types/employee';
import { EmployeeService } from 'src/app/services/employee.service';

export const employeeDetailsResolver: ResolveFn<Employee> = (route: ActivatedRouteSnapshot) => {
    const employeeService = inject(EmployeeService);
    const id = +(route.paramMap.get('id') ?? 0);
    return employeeService.getEmployee(id);
}