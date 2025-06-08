import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuHorizontalComponent } from '../menu-horizontal/menu-horizontal.component';

@Component({
  imports: [CommonModule, MenuHorizontalComponent],
  selector: 'app-menus-entry',
  template: `<app-menu-horizontal></app-menu-horizontal>`,
})
export class RemoteEntryComponent {}
