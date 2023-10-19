import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/infrastructure/types/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-project-card',
    template: `
        <div *ngIf="project$ | async as project" class="card">
            <img [ngSrc]="project.image" width="100" height="100" loading="eager" sizes="100vw, 50vw"/>
            <div class="card-body">
                <a [routerLink]="['/work/projects', project.id]">{{ project.name }}</a>
            </div>
        </div>
    `,
    imports: [NgIf, AsyncPipe, RouterLink, NgOptimizedImage],
    standalone: true,
})
export class ProjectCardComponent implements OnChanges {
    private readonly projectService = inject(ProjectService);

    @Input({required: true}) projectId!: number;
    project$: Observable<Project> | null = null;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['projectId']) {
            this.project$ = this.projectService.getProject(this.projectId);
        }
    }
}