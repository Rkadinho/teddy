import { clientesResponse, DadosCacheService, TeddyBotaoComponent, TeddyCardComponent } from '@teddy/lib';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes-selecionados',
  imports: [CommonModule, TeddyCardComponent, TeddyBotaoComponent],
  templateUrl: './clientesSelecionados.component.html',
  styleUrls: ['./clientesSelecionados.component.css']
})
export class ClientesSelecionadosComponent implements OnInit {
  clientes: clientesResponse[] = [];
  titulo = 'Clientes selecionados:'
  textoBotao = "Limpar clientes selecionados";
  erro = 'Nenhum cliente selecionado'

  constructor(private dadosCache: DadosCacheService) {}

  ngOnInit() {
    this.clientes = this.dadosCache.clientesSelecionados;
    console.log(this.clientes)
  }

  remover(clienteId: number) {
    this.dadosCache.removerClienteSelecionado(clienteId);
    this.clientes = this.dadosCache.clientesSelecionados;
  }

  limparTodos() {
    this.dadosCache.limparClientesSelecionados();
    this.clientes = [];
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });
  }
}
