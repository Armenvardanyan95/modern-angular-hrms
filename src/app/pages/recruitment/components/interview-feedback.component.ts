import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-interview-feedback',
    template: `
        Interview feedback
    `,
    standalone: true,
})
export class InterviewFeedbackComponent {
    @Input() candidateId!: number;
}