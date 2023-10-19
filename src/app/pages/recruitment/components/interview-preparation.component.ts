import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interview-preparation',
  template: `Interview preparation`,
  standalone: true,
})
export class InterviewPreparationComponent {
  @Input() candidateId!: number;
}
