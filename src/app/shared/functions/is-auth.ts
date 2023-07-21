import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export function isAuth() {
    const authService = inject(AuthService);
    return authService.isAuth$.asObservable();
}