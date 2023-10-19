import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-onboarding-preparation',
  template: `Onboarding preparation`,
  standalone: true,
})
export class OnboardingPreparationComponent {
  @Input() candidateId!: number;
}
