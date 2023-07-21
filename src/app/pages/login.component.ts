import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    template: `
        <div class="login-container">
            <h1>Login</h1>
            <form>
                <input type="text" name="email" placeholder="Email" [(ngModel)]="credentials.email">
                <input type="password" name="password" placeholder="Password" [(ngModel)]="credentials.password">
                <button type="submit" (click)="submit()">Login</button>
            </form>
            <span class="warning" *ngIf="!credentials.email || !credentials.password">
                Please fill in all the required fields
            </span>
        </div>
    `,
    standalone: true,
    imports: [FormsModule, NgIf],
    providers: [AuthService],
})
export class LoginComponent {
    credentials = { email: '', password: '' };

    constructor(
        private authService: AuthService,
        ) {}

    submit() {
        if (this.credentials.email && this.credentials.password) {
            this.authService.login(this.credentials).subscribe();
        }
    }
}