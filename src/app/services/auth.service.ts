import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {
    private readonly http = inject(HttpClient);
    isAuth$ = new BehaviorSubject(true);

    login(credentials: { email: string, password: string }) {
        return this.http.post('/api/auth/login', credentials).pipe(
            tap(() => this.isAuth$.next(true)),
        );
    }

    logout() {
        return this.http.post('/api/auth/logout', {}).pipe(
            tap(() => this.isAuth$.next(false)),
        );
    } 

    getToken() {
        return localStorage.getItem('token');
    }
}