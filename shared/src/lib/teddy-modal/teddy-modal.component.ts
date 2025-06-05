import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clientes } from '../../models/clientes';
import { FormsModule } from '@angular/forms';
import { TeddyBotaoComponent } from "../teddy-botao/teddy-botao.component";

@Component({
  selector: 'lib-teddy-modal',
  imports: [FormsModule, TeddyBotaoComponent],
  templateUrl: './teddy-modal.component.html',
  styleUrls: ['./teddy-modal.component.css']
})
export class TeddyModalComponent  {
  @Input() cliente: Clientes = { nome: '', salario: '', valorEmpresa: '' };
  @Input() titulo = '';
  @Input() tituloBotao = '';
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();
  salvarClicado = false;

  fecharModal() {
    this.fechar.emit();
  }

  salvarCliente() {
    if (this.salvarClicado) return;
    this.salvarClicado = true;

    this.salvar.emit(this.cliente);

    setTimeout(() => this.salvarClicado = false, 500);
  }

}
