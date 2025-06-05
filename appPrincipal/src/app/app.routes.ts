import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('inicio/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('dashboard/Routes').then((m) => m.remoteRoutes),
  },
];
