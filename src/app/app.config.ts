import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GaugeModule } from 'angular-gauge';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
