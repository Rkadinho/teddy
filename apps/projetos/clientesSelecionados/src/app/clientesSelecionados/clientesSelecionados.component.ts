import { clientesResponse, DadosCacheService, TeddyBotaoComponent, TeddyCardComponent, ToastService } from '@teddy/lib';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes-selecionados',
  imports: [CommonModule, TeddyCardComponent, TeddyBotaoComponent, FormsModule],
  templateUrl: './clientesSelecionados.component.html',
  styleUrls: ['./clientesSelecionados.component.css']
})
export class ClientesSelecionadosComponent implements OnInit {
  clientes: clientesResponse[] = [];
  titulo = 'Clientes selecionados:'
  textoBotao = "Limpar clientes selecionados";
  erro = 'Nenhum cliente selecionado';
  clientesPagina = 'Clientes selecionados por página:';
  clientesPorPagina = 16;
  paginaAtual = 1;

  constructor(private dadosCache: DadosCacheService, private toastService: ToastService) {}

  ngOnInit() {
    this.clientes = this.dadosCache.clientesSelecionados;
    this.atualizarClientes();
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

  get totalPaginas(): number {
    return Math.ceil(this.clientes.length / this.clientesPorPagina);
  }

  get clientesPaginados(): clientesResponse[] {
    const inicio = (this.paginaAtual - 1) * this.clientesPorPagina;
    return this.clientes.slice(inicio, inicio + this.clientesPorPagina);
  }

  aoMudarClientesPorPagina() {
    if (this.clientesPorPagina < 1) {
      this.clientesPorPagina = 1;
    }

    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas;
    }
  }

  atualizarClientes() {
    this.clientes = this.dadosCache.clientesSelecionados;
    const total = this.totalPaginas;
    if (this.paginaAtual > total) {
      this.paginaAtual = total;
    }
  }

}
