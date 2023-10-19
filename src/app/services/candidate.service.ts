import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Candidate } from '../infrastructure/types/candidate';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private readonly http = inject(HttpClient);

  getCandidates() {
    return this.http.get<Candidate[]>('/candidates');
  }

  getCandidatesByName(name: string) {
    return this.http.get<Candidate[]>(`/candidates?firstName_like=${name}`);
  }

  getCandidate(id: number) {
    return this.http.get<Candidate>(`/candidates/${id}`);
  }
}