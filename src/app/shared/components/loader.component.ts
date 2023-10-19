import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  template: ` <div class='loading-container'>
    <ng-content />
    <div *ngIf="loading" class="blocker">
      spinner
    </div>
  </div>`,
  standalone: true,
  styles: [
    `
      .loading-container {
        position: relative;
      }
      .blocker {
        background-color: black;
        position: absolute;
        top: 0;
        z-index: 9999;
        width: 100%;
        height: 100%;
        opacity: 0.4;
      }
    `,
  ],
  imports: [NgIf],
})
export class LoaderComponent {
  @Input() loading = false;
}
