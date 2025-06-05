import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeddyBotaoComponent } from '../teddy-botao/teddy-botao.component';

@Component({
  selector: 'lib-teddy-modal-excluir',
  imports: [TeddyBotaoComponent],
  templateUrl: './teddy-modal-excluir.component.html',
  styleUrls: ['./teddy-modal-excluir.component.css']
})
export class TeddyModalExcluirComponent {
  @Input() titulo = '';
  @Input() tituloBotao = '';
  @Input() texto ='';
  @Input() nomeCliente = '';
  @Output() fechar = new EventEmitter<void>();
  @Output() excluir = new EventEmitter<any>();

  fecharModal() {
    this.fechar.emit();
  }

  excluirCliente() {
    this.excluir.emit();
  }

}
