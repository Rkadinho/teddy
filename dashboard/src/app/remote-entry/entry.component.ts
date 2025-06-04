import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  imports: [CommonModule, DashboardComponent],
  selector: 'app-dashboard-entry',
  template: `<app-dashboard></app-dashboard>`,
})
export class RemoteEntryComponent {}
