import { Injectable } from '@angular/core';
import { clientesResponse } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class DadosCacheService {
 private readonly STORAGE_KEY_USUARIO = 'nomeUsuario';
  private readonly STORAGE_KEY_CLIENTES = 'clientesSelecionados';
  private readonly STORAGE_KEY_MENU = 'abrirMenu';

  set nomeUsuario(nome: string) {
    localStorage.setItem(this.STORAGE_KEY_USUARIO, nome);
  }

  get nomeUsuario(): string {
    return localStorage.getItem(this.STORAGE_KEY_USUARIO) || '';
  }

  set clientesSelecionados(clientes: clientesResponse[]) {
    localStorage.setItem(this.STORAGE_KEY_CLIENTES, JSON.stringify(clientes));
  }

  get clientesSelecionados(): clientesResponse[] {
    const json = localStorage.getItem(this.STORAGE_KEY_CLIENTES);
    return json ? JSON.parse(json) : [];
  }

  adicionarClienteSelecionado(cliente: clientesResponse) {
    const atuais = this.clientesSelecionados;
    const jaExiste = atuais.some(c => c.id === cliente.id);
    if (!jaExiste) {
      this.clientesSelecionados = [...atuais, cliente];
    }
  }

  removerClienteSelecionado(id: number) {
    const atualizados = this.clientesSelecionados.filter(c => c.id !== id);
    this.clientesSelecionados = atualizados;
  }

  limparClientesSelecionados() {
    localStorage.removeItem(this.STORAGE_KEY_CLIENTES);
  }

  limparDados() {
    localStorage.removeItem(this.STORAGE_KEY_USUARIO);
    localStorage.removeItem(this.STORAGE_KEY_CLIENTES);
  }
}
