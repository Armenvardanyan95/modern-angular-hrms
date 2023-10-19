import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cv-evaluation',
    template: `
        CV evaluation
    `,
    standalone: true,
})
export class CvEvaluationComponent {
    @Input() candidateId!: number;
}