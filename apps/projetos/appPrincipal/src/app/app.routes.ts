import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('inicio/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('menus/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('dashboard/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('clientesSelecionados/Routes').then((m) => m.remoteRoutes),
  },
];
