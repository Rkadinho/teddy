import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-teddy-input-basico',
  imports: [CommonModule, FormsModule],
  templateUrl: './teddy-input-basico.component.html',
  styleUrls: ['./teddy-input-basico.component.css']
})
export class TeddyInputBasicoComponent {
  @Input() placeholder = '';
  @Input() obrigatorio = false;
  @Input() valor = '';
  @Input() textoErro = 'Este campo é obrigatório.';
  @Output() pegarValor = new EventEmitter<string>();

  onPegarValor(event: any) {
    this.valor = event.target.value;
    this.pegarValor.emit(this.valor);
  }
}
