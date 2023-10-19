import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { addApiUrl } from './shared/interceptors/api-url.interceptor';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { TruncateLimit } from './shared/directives/truncate.directive';
import { ImageLoaderConfig } from '@angular/common';

const imageLoader = (config: ImageLoaderConfig) => {
  return config.loaderParams;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([addApiUrl, authInterceptor]),
    ),
    { provide: TruncateLimit, useValue: 70 }
  ],
};
