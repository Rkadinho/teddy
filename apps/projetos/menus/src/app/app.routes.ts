import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'menus',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
];
