import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clientes } from '../../models/clientes';
import { FormsModule } from '@angular/forms';
import { TeddyBotaoComponent } from "../teddy-botao/teddy-botao.component";
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@Component({
  selector: 'lib-teddy-modal',
  imports: [FormsModule, TeddyBotaoComponent, CurrencyMaskModule],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
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
  nomeCliente = 'Nome do cliente';
  salario = 'Salário';
  empresa = 'Valor da empresa';

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
