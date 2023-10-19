import { Routes } from '@angular/router';
import { CandidatesListComponent } from './candidates-list.component';
import { CandidateDetailsComponent } from './candidate-details.component';
import { candidateDetailsResolver } from 'src/app/shared/resolvers/candidate-details.resolver';

export const routes: Routes = [
    { path: '', redirectTo: 'candidates', pathMatch: 'full' },
    { path: 'candidates', pathMatch: 'full', component: CandidatesListComponent },
    { path: 'candidates/:id', component: CandidateDetailsComponent, resolve: { candidate: candidateDetailsResolver } },
];