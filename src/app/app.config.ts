import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { addApiUrl } from './shared/interceptors/api-url.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { TruncateLimit } from './shared/directives/truncate.directive';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([addApiUrl, authInterceptor]),
    ),
    { provide: TruncateLimit, useValue: 70 }
  ],
};
