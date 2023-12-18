import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    notifications$ = interval(2_500_000).pipe(map(() => []), tap(() => console.log('EMITTED')));
}