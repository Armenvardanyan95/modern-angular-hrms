import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../infrastructure/types/project';

@Injectable({providedIn: 'root'})
export class ProjectService {
    http = inject(HttpClient);

    getProject(id: number) {
        return this.http.get<Project>(`/projects/${id}`);
    }

    getProjects() {
        return this.http.get<Project[]>(`/projects`);
    }

    getProjectsByEmployeeId(employeeId: number) {
        return this.http.get<Project[]>(`/projects?employees_like=${employeeId}`);
    }
}