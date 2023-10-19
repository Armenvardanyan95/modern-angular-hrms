import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Project } from 'src/app/infrastructure/types/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from 'src/app/shared/components/project-card.component';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="project-details">
      <h3>Project Details</h3>
      <div *ngIf="project$ | async as project">
        <span>Project Name: {{ project.name }}</span>
        <span>Project Description: {{ project.description }}</span>
        <span>Logo: {{ project.image }}</span>
        <div class="subprojects">
          <span>Subprojects:</span>
          <app-project-card
            *ngFor="let subProjectId of project.subProjectIds"
            [projectId]="subProjectId"
          >
          </app-project-card>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ProjectCardComponent],
})
export class ProjectDetailsComponent implements OnChanges {
  @Input({transform: numberAttribute}) id!: number;
  private readonly projectService = inject(ProjectService);
  project$: Observable<Project> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.project$ = this.projectService.getProject(this.id);
    }
  }
}