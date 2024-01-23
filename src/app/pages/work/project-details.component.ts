import { Component, input, inject, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from 'src/app/shared/components/project-card.component';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="project-details">
      <h3>Project Details</h3>
      @if (project(); as project) {
      <div>
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
      }
    </div>
  `,
  standalone: true,
  imports: [ProjectCardComponent],
})
export class ProjectDetailsComponent {
  private readonly projectService = inject(ProjectService);
  id = input.required({ transform: numberAttribute });
  project = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.projectService.getProject(id))
    )
  );
}
