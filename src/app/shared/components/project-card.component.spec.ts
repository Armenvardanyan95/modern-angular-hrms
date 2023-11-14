import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { RenderResult, render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { MockDirective, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { Project } from 'src/app/infrastructure/types/project';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectCardComponent } from './project-card.component';

let component: RenderResult<ProjectCardComponent>;

const mockProjects: Project[] = [
    {
        id: 1,
        name: 'Project 1',
        description: 'Project 1 description',
        image: 'path-to-image1.png',
        employees: [],
        subProjectIds: [],
    },
    {
        id: 2,
        name: 'Project 2',
        description: 'Project 2 description',
        image: 'path-to-image2.png',
        employees: [],
        subProjectIds: [],
    },
    {
        id: 3,
        name: 'Project 3',
        description: 'Project 3 description',
        image: 'path-to-image3.png',
        employees: [],
        subProjectIds: [],
    },
];

describe('ProjectCardComponent', () => {
  beforeEach(async () => {
    component = await render(ProjectCardComponent, {
      imports: [
        AsyncPipe,
        NgIf,
        RouterTestingModule,
        MockDirective(NgOptimizedImage),
      ],
      providers: [
        MockProvider(ProjectService, {
          getProject(id) {
            return of(mockProjects.find((project) => project.id === id)!);
          },
        }),
      ],
      componentInputs: {
        projectId: 1,
      },
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the project name', () => {
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    component.fixture.componentRef.setInput('projectId', 2);
    component.fixture.detectChanges();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });
});
