import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesSelecionadosComponent } from '../clientesSelecionados/clientesSelecionados.component';

@Component({
  imports: [CommonModule, ClientesSelecionadosComponent],
  selector: 'app-clientes-selecionados-entry',
  template: `<app-clientes-selecionados></app-clientes-selecionados>`,
})
export class RemoteEntryComponent {}
