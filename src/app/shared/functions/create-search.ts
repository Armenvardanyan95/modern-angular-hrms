import { DestroyRef, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export function createSearch<T>(
  control: FormControl<T>,
  destroyRef = inject(DestroyRef),
) {
  const destroy$ = new Subject<void>();
  destroyRef.onDestroy(() => destroy$.next());
  return control.valueChanges.pipe(debounceTime(500), takeUntil(destroy$));
}