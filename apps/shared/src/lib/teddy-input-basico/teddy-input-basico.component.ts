import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-teddy-input-basico',
  imports: [CommonModule, FormsModule],
  templateUrl: './teddy-input-basico.component.html',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeddyInputBasicoComponent),
      multi: true,
    },
  ],
  styleUrls: ['./teddy-input-basico.component.css']
})
export class TeddyInputBasicoComponent {
  @Input() placeholder = '';
  @Input() obrigatorio = false;
  @Input() valor = '';
  @Input() textoErro = 'Este campo é obrigatório.';
  @Output() pegarValor = new EventEmitter<string>();

  private onChange = (_: any) => {};
  private onTouched = () => {};

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pegarValor.emit(input.value);
  }

  writeValue(value: string): void {
    this.valor = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
