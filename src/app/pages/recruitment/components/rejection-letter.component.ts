import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rejection-letter',
  template: `Rejection letter`,
  standalone: true,
})
export class RejectionLetterComponent {
  @Input() candidateId!: number;
}
