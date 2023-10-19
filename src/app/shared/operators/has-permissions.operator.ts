import { inject } from '@angular/core';
import { MonoTypeOperatorFunction, pipe } from 'rxjs';
import { withLatestFrom, filter, map } from 'rxjs/operators';
import { Permissions } from 'src/app/infrastructure/types/permissions';
import { PermissionsService } from 'src/app/services/permissions.service';

export function hasPermissions<T>(
    permissions: Permissions[],
    permissionsService = inject(PermissionsService),
): MonoTypeOperatorFunction<T> {

    return pipe(
        withLatestFrom(permissionsService.hasPermissions(permissions)),
        filter(([, hasPermissions]) => hasPermissions),
        map(([value]) => value)   
    );
}