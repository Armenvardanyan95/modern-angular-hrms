import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { isAuth } from '../functions/is-auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <div>
      <h2>HRMS</h2>
      <p>Welcome to HRMS platform!</p>
      <div class="links">
        Follow us on social media:
        <a href="https://linkedin.com" target="_blank">Linkedin</a>
        <a href="https://x.com" target="_blank">X (former Twitter)</a>
      </div>
      <div *ngIf="isAuth$ | async" class="legal">
        <a routerLink="/terms">Terms of Service</a>
        <a routerLink="/privacy">Privacy Policy</a>
        <a routerLink="/cookies">Cookies Policy</a>
      </div>
    </div>
  `,
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgIf],
})
export class FooterComponent {
  isAuth$ = isAuth();
}
