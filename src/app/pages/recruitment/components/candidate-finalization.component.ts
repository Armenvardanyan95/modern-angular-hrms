import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-candidate-finalization',
  template: `Candidate finalization`,
  standalone: true,
})
export class CandidateFinalizationComponent {
  @Input() candidateId!: number;
}
