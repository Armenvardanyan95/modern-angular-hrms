import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Candidate } from 'src/app/infrastructure/types/candidate';
import { CandidateService } from 'src/app/services/candidate.service';

export const candidateDetailsResolver: ResolveFn<Candidate> = (
  route: ActivatedRouteSnapshot
) => {
  const candidateService = inject(CandidateService);
  const id = +(route.paramMap.get('id') ?? 0);
  return candidateService.getCandidate(id);
};
