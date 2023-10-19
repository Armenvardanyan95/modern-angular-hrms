import { AsyncPipe, NgFor, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/infrastructure/types/employee';
import { Project } from 'src/app/infrastructure/types/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from 'src/app/shared/components/project-card.component';

@Component({
  selector: 'app-employee-details',
  template: `
    <h2>Employee Details</h2>
    <img [ngSrc]="employee.profilePicture" width="50" height="50" [alt]="employee.firstName" priority />
    <div>
      <label>First Name: </label>{{ employee.firstName }}
      <label>Last Name: </label>{{ employee.lastName }}
      <label>Position: </label>{{ employee.position }}
    </div>
    <div class="projects">
      <h3>Projects</h3>
      <div *ngFor="let project of projects$ | async" class="project">
        <app-project-card [projectId]="project.id"></app-project-card>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgOptimizedImage, NgFor, AsyncPipe, ProjectCardComponent],
})
export class EmployeeDetailsComponent implements OnInit {
  projectService = inject(ProjectService);
  @Input() employee!: Employee;
  projects$: Observable<Project[]> | null = null;
  
  ngOnInit() {
    this.projects$ = this.projectService.getProjectsByEmployeeId(this.employee.id);
  }
}
