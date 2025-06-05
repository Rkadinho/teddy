import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-teddy-card',
  imports: [CommonModule],
  templateUrl: './teddy-card.component.html',
  styleUrls: ['./teddy-card.component.css']
})
export class TeddyCardComponent {

  @Input() nome = '';
  @Input() salario = '';
  @Input() empresa = '';
  @Input() tipo: "cadastro" | "selecionado" = "cadastro";

  @Output() adicionar = new EventEmitter<void>();
  @Output() editar = new EventEmitter<void>();
  @Output() excluir = new EventEmitter<void>();
  @Output() limparSelecionado = new EventEmitter<void>();

  onAdicionar() {
    this.adicionar.emit();
  }

  onEditar() {
    this.editar.emit();
  }

  onExcluir() {
    this.excluir.emit();
  }

  onLimparSelecionado() {
    this.limparSelecionado.emit()
  }

}
