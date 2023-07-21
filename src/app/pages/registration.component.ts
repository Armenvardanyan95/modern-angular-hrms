import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-registration',
    template: `
        <div class="registration-container">
            <h1>Registration</h1>
            <form>
                <input type="text" name="email" placeholder="Email" [(ngModel)]="credentials.email">
                <input type="password" name="password" placeholder="Password" [(ngModel)]="credentials.password">
                <input type="password" name="password" placeholder="Confirm Password" [(ngModel)]="credentials.password">
                <button type="submit" (click)="submit()">Register</button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [FormsModule, NgIf],
})
export class RegistrationComponent {
    credentials = { email: '', password: '', confirmPassword: '' };

    constructor() {}

    submit() {
        if (this.credentials.email && this.credentials.password) {
            // this.authService.login(this.credentials).subscribe();
        }
    }
}