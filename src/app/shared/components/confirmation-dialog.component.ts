import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <dialog [open]="isConfirmationOpen">
      Are you sure you want to perform this action?

      <button (click)="isConfirmationOpen = false">Cancel</button>
      <button (click)="isConfirmationOpen = false">Confirm</button>
    </dialog>
  `,
  standalone: true,
})
export class ConfirmationDialogComponent {
    isConfirmationOpen = true;
}