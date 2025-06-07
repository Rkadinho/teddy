import { Injectable } from '@angular/core';
import { clientesResponse } from '../models/clientes';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DadosCacheService {
  constructor(private toastService: ToastService) {}

 private readonly STORAGE_KEY_USUARIO = 'nomeUsuario';
  private readonly STORAGE_KEY_CLIENTES = 'clientesSelecionados';

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
      this.toastService.mostrarToast('Cliente selecionado com sucesso!', 'sucesso');
    } else if(jaExiste) {
      this.toastService.mostrarToast('Este cliente ja foi selecionado', 'erro');
    }
  }

  atualizarClienteSelecionado(clienteAtualizado: clientesResponse) {
    const atualizados = this.clientesSelecionados.map(cliente =>
      cliente.id === clienteAtualizado.id ? clienteAtualizado : cliente
    );
    this.clientesSelecionados = atualizados;
  }

  removerClienteSelecionado(id: number) {
    const atualizados = this.clientesSelecionados.filter(c => c.id !== id);
    this.toastService.mostrarToast('Cliente removido com sucesso!', 'sucesso');
    this.clientesSelecionados = atualizados;
  }

  limparClientesSelecionados() {
    this.toastService.mostrarToast('Todos os cliente removido com sucesso!', 'sucesso');
    localStorage.removeItem(this.STORAGE_KEY_CLIENTES);
  }

  limparDados() {
    localStorage.removeItem(this.STORAGE_KEY_USUARIO);
    localStorage.removeItem(this.STORAGE_KEY_CLIENTES);
  }
}
