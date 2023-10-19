import {
  HttpHandlerFn,
  HttpRequest,
  HttpInterceptorFn,
} from '@angular/common/http';
import { hasPermissions } from '../operators/has-permissions.operator';

export const employeePermissionsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    hasPermissions(['CreateEmployee', 'DeleteEmployee', 'EditEmployeeGeneralDetails', 'ViewEmployees']),
  );
};

