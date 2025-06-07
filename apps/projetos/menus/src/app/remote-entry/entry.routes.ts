import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { MenuHorizontalComponent } from '../menu-horizontal/menu-horizontal.component';
import { MenuVerticalComponent } from '../menu-vertical/menu-vertical.component';

export const remoteRoutes: Route[] = [
  { path: 'menus', component: MenuHorizontalComponent },
  { path: 'menuVertical', component: MenuVerticalComponent}
];
