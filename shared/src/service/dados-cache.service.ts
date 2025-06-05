import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosCacheService {
  private readonly STORAGE_KEY = 'nomeUsuario';

  set nomeUsuario(nome: string) {
    localStorage.setItem(this.STORAGE_KEY, nome);
  }

  get nomeUsuario(): string {
    return localStorage.getItem(this.STORAGE_KEY) || '';
  }

  limparDados() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

}
