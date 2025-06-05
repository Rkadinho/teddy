import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosCacheService {

  private _nome = '';

  set nomeUsuario(nome: string) {
    this._nome = nome;
  }

  get nomeUsuario(): string {
    return this._nome;
  }

}
