import { HttpHandlerFn, HttpRequest, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const newReq = req.clone({setHeaders: {
    'Authorization': `Bearer ${token}`,
  }});
  return next(newReq);
}
