import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'inicio',
    loadChildren: () => import('inicio/Routes').then((m) => m.remoteRoutes),
  },
    {
    path: 'dashboard',
    loadChildren: () =>
      import('dashboard/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
