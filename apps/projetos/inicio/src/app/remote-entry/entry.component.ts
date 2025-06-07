import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../login/login.component";

@Component({
  imports: [CommonModule, LoginComponent],
  selector: 'app-inicio-entry',
  template: `<app-login></app-login>`,
})
export class RemoteEntryComponent {}
