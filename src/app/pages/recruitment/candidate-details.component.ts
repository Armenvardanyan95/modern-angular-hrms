import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Candidate } from 'src/app/infrastructure/types/candidate';
import { CvEvaluationComponent } from './components/cv-evaluation.component';
import { InterviewPreparationComponent } from './components/interview-preparation.component';
import { InterviewFeedbackComponent } from './components/interview-feedback.component';
import { RejectionLetterComponent } from './components/rejection-letter.component';
import { OnboardingPreparationComponent } from './components/onboarding-preparation.component';
import { CandidateFinalizationComponent } from './components/candidate-finalization.component';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-candidate-details',
  template: `
    <div class="candidate-details">
      <div>
        <h2>{{ candidate.firstName }} {{ candidate.lastName }}</h2>
        <p>Email: {{ candidate.email }}</p>
        <p>{{ candidate.position }}</p>
      </div>
      @switch (candidate.status) {
        @case ('CV evaluation') {
          <app-cv-evaluation [candidateId]="candidate.id"/>
        }
        @case ('Interview preparation') {
          <app-interview-preparation [candidateId]="candidate.id" />
        }
        @case ('Interview Feedback') {
          <app-interview-feedback [candidateId]="candidate.id" />
        }
        @case ('Rejected') {
          <app-rejection-letter [candidateId]="candidate.id" />
        }
        @case ('Approved') {
          @if (candidate.offerAccepted) {
            <app-onboarding-preparation [candidateId]="candidate.id" />
          } @else {
            <app-candidate-finalization [candidateId]="candidate.id" />
          }
        }
        @default {
          <span>Unknown candidate status</span>
        }
      }
    </div>
  `,
  standalone: true,
  imports: [
    CvEvaluationComponent,
    InterviewPreparationComponent,
    InterviewFeedbackComponent,
    RejectionLetterComponent,
    OnboardingPreparationComponent,
    CandidateFinalizationComponent,
  ],
})
export class CandidateDetailsComponent {
  @Input() candidate!: Candidate;
}
