import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-teddy-toast',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './teddy-toast.component.html',
  styleUrls: ['./teddy-toast.component.css']
})
export class TeddyToastComponent {
  @Input() mensagem = '';
  @Input() tipo: 'sucesso' | 'erro' | 'info' = 'sucesso';
  @Output() fechar = new EventEmitter<void>();
  mostrarToast = false;

  fecharToast() {
    this.fechar.emit();
  }

}
