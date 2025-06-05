import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-teddy-botao',
  imports: [CommonModule],
  templateUrl: './teddy-botao.component.html',
  styleUrl: './teddy-botao.component.css',
})
export class TeddyBotaoComponent {
  @Input() texto= '';
  @Input() desativado= false;
  @Input() tamanho: 'pequeno' | 'medio' | 'grande' = 'pequeno';
  @Output() clique = new EventEmitter<Event>();

  onClique(event: Event) {
    this.clique.emit(event);
  }
}
