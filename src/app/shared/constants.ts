import { InjectionToken } from '@angular/core';

const CONSTANTS = {
    dateFormat: 'dd/MM/yyyy',
};

export const Constants = new InjectionToken('Constants', {
    factory() {
        return CONSTANTS;
    },
    providedIn: 'root',
});